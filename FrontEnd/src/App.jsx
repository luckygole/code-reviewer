
// import { useState , useEffect } from 'react'
// import "prismjs/themes/prism-tomorrow.css"
// import Editor from 'react-simple-code-editor'
// import prism from "prismjs"
// import axios from 'axios'
// import Markdown from 'react-markdown'
// import './App.css'


// function App() {
//   const [count, setCount] = useState(0)
//   const [code, setCode] = useState(`function sum(a, b){
//      return a + b; 
//      }`)

//   const [review, setReview] = useState('') 

//   useEffect(() => { 
//     prism.highlightAll()
//   });

//   async function reviewCode() {
//     try {
//       // const backendUrl = process.env.REACT_APP_BACKEND_URL;

//       const backendUrl = import.meta.env.VITE_BACKEND_URL;


//       // const res = await axios.post("https://code-reviewer-ypvt.onrender.com/ai/get-review", { code })
//       const res = await axios.post(`${backendUrl}/ai/get-review`, { code });

//       setReview(res.data)
//       // console.log(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <>
//     <main>
//       <div className="left">
//         <div className="code">
//           <Editor
//             value={code}
//             onValueChange={code => setCode(code)}
//             highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
//             padding={10}
//             style={{
//               fontFamily: '"Fira code", "Fira Mono", monospace',
//               fontSize: 12,
//               border: '1px solid #ddd',
//               borderRadius: '5px',
//               height: '100%'
//             }}
//           />
//         </div>
//         <div className="review" onClick={reviewCode}>Review</div>
//       </div>
//       <div className="right">
//           <Markdown>
//             {review}
//           </Markdown>
//       </div>
//     </main>
//     </>
//   )
// }


// export default App

import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown" 
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'


function App() {
  
  const [code, setCode] = useState(`// Write your code here
function example() {
  // This is a sample function
  const greeting = "Hello, World!";
  console.log(greeting);
  return greeting;
}`)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    setError(null)
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      // const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await axios.post(`${API_URL}/ai/get-review`, { code })
      setReview(response.data)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to get review. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="nav-icon">🤖</span>
          <h1>AI Code Review</h1>
        </div>
      </nav>

      <main className="main-content">
        <div className="editor-section">
          <div className="editor-header">
            <h2>Code Editor</h2>
            <div className="language-badge">JavaScript</div>
          </div>
          <div className="editor-container">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                minHeight: '400px'
              }}
            />
          </div>
          <button
            onClick={reviewCode}
            disabled={loading || !code.trim()}
            className={`review-button ${loading ? 'loading' : ''}`}>
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span className="icon">📝</span>
                <span>Review Code</span>
              </>
            )}
          </button>
        </div>

        <div className="review-section">
          <div className="review-header">
            <h2>AI Review</h2>
          </div>
          <div className="review-container">
            {error && (
              <div className="error-box">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}
            {loading && (
              <div className="loading-box">
                <div className="loading-animation"></div>
                <p>AI is analyzing your code...</p>
              </div>
            )}
            {!loading && !error && (
              <div className="markdown-content">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review || "# Welcome to AI Code Review\n\nPaste your code in the editor and click 'Review Code' to get AI-powered suggestions and improvements."}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Powered by AI • Made with Lucky</p>
      </footer>
    </div>
  )
}

export default App