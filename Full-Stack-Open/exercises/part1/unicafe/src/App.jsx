import { useState } from 'react'

const Statistics = (props) => {

    const all = props.good + props.neutral + props.bad
    const average = (props.good - props.bad) / all
    const positive = (props.good / all) * 100

    if (all === 0) {
        return (<p>No feedback given</p>)
    }

    return (
        <div>
            <p>
                good {props.good}<br />
                neutral {props.neutral}<br />
                bad {props.bad}<br />
                all {all}<br />
                average {average}<br />
                positive {positive} %
            </p>
        </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => {
    setGood(good + 1)
  }
  const clickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const clickBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={clickGood}>good</button>
        <button onClick={clickNeutral}>neutral</button>
        <button onClick={clickBad}>bad</button>
      </div>

      <h1>statistics</h1>

      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad}
      />

    </div>
    
  )
}

export default App