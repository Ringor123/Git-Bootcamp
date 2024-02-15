import { useState } from 'react'



const StatisticLine = ({text, value}) => {
  return <tbody>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
    </tbody>
}
const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const average = (((good + (bad * -1)) / all)).toFixed(1) || 0
  const positive = ((good * 100 / all)).toFixed(1) || 0
  
  if(all !=0){
  return <table>
    <StatisticLine text='good' value={good}/>
    <StatisticLine text='neutral' value={neutral}/>
    <StatisticLine text='bad' value={bad}/>
    <StatisticLine text='all' value={all}/>
    <StatisticLine text='average' value={average}/>
    <StatisticLine text='positive' value={positive + ' %'}/>
  </table>} else {
    return <div>
      <p>No feddback given</p>
    </div>
  }
}

const Button = ({onClick, text}) => { return <button onClick={onClick}>{text}</button>}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

export default App