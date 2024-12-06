import './App.css'
import React from 'react'

export default function App() {

  const START_TIME = 5
  
  const [text, setText] = React.useState("")
  const [timeRemaining, setTimeRemaining] = 
    React.useState(START_TIME)
  const [isTimeRunning, setIsTimeRunning] =
    React.useState(false)
  const [wordCount, setWordCount] = React.useState(0)
  const textBox = React.useRef(null)

  function handleChange(e) {
    const {value} = e.target
    setText(value)
  }


  function calculateWordCount(text) {
    const wrrdArr = text.trim().split(" ")
    return wrrdArr.filter(word => word !== "").length
  }

  function startGame() {
    setIsTimeRunning(true)
    setTimeRemaining(START_TIME)  
    setText("")
    textBox.current.disabled = false
    textBox.current.focus()
    setWordCount(0)
  }

  function endGame() {
    setIsTimeRunning(false)
    setWordCount(calculateWordCount(text))
  }
  
  React.useEffect(() => {
    if(isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(time => time - 1)
      }, 1000)
    } else if(timeRemaining === 0) {
      endGame()
    }
    
  }, [timeRemaining, isTimeRunning])
  
  return (
    <div>
      <h1>How fast do you type</h1>
      <textarea 
        ref={textBox}
        value={text}
        onChange={handleChange}
        disabled={!isTimeRunning}/>
      <h1>Time remaining: {timeRemaining}</h1>
      <button 
        onClick={startGame}
        disabled={isTimeRunning}>Start</button>
      <h1>Word count: {wordCount}</h1>
    </div>
  )
}
