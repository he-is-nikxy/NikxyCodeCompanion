
import { useEffect, useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
// import 'prismjs/components/prism-jsx'
import prism from "prismjs"
import Editor from "react-simple-code-editor"
import axios from "axios"
import Markdown from "react-markdown"
import './App.css'
import Loading from './components/Loading'

function App() {

  const [code, setCode] = useState(``)
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('')

  useEffect(() => {
    prism.highlightAll() // Automatically highlight all code blocks on the page
  })

  // const reviewCode = async () => {
  //   const response = await axios.post('http://localhost:3000/ai/get-review', { code })

  //   setReview(response.data) 
  // }

  const reviewCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://nikxycodecompanion.onrender.com/ai/get-review', { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please check the console for errors.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div id="code-reviewer">
        <div id="header">
          <h1>Nikxy's Code Companion 🧙‍♂️</h1>
          <p>AI-Powered Code Analysis, Insights & Optimizer. See the Strength 💪🏻 & Weakness 👎🏻 of Your Code 👾.</p>
        </div>
        <div id='review-div'>
          <button onClick={reviewCode}>Review Code</button>
        </div>
        <div id="main">
          <div className="main-child" id='left'>
            <div id="code-part">
              <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={10}
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: 16,
                  width: '100%',
                  height: 'auto',
                  minHeight: '100%',
                  overflow: 'auto',
                }}
              />
            </div>
          </div>
          <div className="main-child" id='right'>
            <div id="review">
              {/* <Markdown>{review}</Markdown> */}
              {loading ? (
                // <p>Loading review...</p>
                <Loading />
              ) : (
                <Markdown>{review}</Markdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App





