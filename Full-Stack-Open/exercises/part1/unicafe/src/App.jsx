import { useState } from 'react'

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = (props) => {

    const all = props.good + props.neutral + props.bad
    const average = (props.good - props.bad) / all
    const positive = (props.good / all) * 100

    const StatisticLine = ({text, value}) => {
        if (text === "positive") {
            value = value.toString() + ' %'
        }
        return(
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        )
    }

    if (all === 0) {
        return (<p>No feedback given</p>)
    }

    return (
        <div>
            <table>
                <StatisticLine text="good" value={props.good} />
                <StatisticLine text="neutral" value={props.neutral} />
                <StatisticLine text="bad" value={props.bad} />
                <StatisticLine text="all" value={all} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={positive} />
            </table>
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
        <Button handleClick={clickGood} text='good' />
        <Button handleClick={clickNeutral} text='neutral' />
        <Button handleClick={clickBad} text='bad' />
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