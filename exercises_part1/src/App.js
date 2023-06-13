import { useState } from 'react'
/*
//UNICAFE 1.6-1.11
const Text = ({ displaytext }) => <h1>{displaytext}</h1>

const Button = ({ handleEvent, text }) => <button onClick={handleEvent}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ all, average, positive, count_good, count_neutral, count_bad }) => {
  if (all === 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  else{ 
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={count_good} />
          <StatisticLine text="neutral" value={count_neutral} />
          <StatisticLine text="bad" value={count_bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + " %"} /> 
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(100)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedAll = updatedGood + neutral + bad
    setAll(updatedAll)
    const updatedAverage = (updatedGood * 1 + neutral * 0 + bad * -1) / updatedAll
    setAverage(updatedAverage)
    const updatedPositive = ((updatedGood / updatedAll) * 100).toFixed(2)
    setPositive(updatedPositive)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const  updatedAll = good + updatedNeutral + bad
    setAll(updatedAll)
    const updatedAverage = (good * 1 + updatedNeutral * 0 + bad * -1) / updatedAll
    setAverage(updatedAverage)
    const updatedPositive = ((good / updatedAll) * 100).toFixed(2)
    setPositive(updatedPositive)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = good + neutral + updatedBad
    setAll(updatedAll)
    const updatedAverage = (good * 1 + neutral * 0 + updatedBad * -1) / updatedAll
    setAverage(updatedAverage)
    const updatedPositive = ((good / updatedAll) * 100).toFixed(2)
    setPositive(updatedPositive)
  }

  return (
    <div>
      <Text displaytext="give feedback" />
      <Button handleEvent={handleGoodClick} text="good" />
      <Button handleEvent={handleNeutralClick} text="neutral" />
      <Button handleEvent={handleBadClick} text="bad" />
      <Text displaytext="statistics" />
      <Statistics all={all} average={average} positive={positive} count_good={good} count_neutral={neutral} count_bad={bad} />
    </div>
  )
}
*/

//ANECDOTES 1.12-1.14
const Button = ({ handleOnClick, text, arrayAncedotes }) => {
  return (
    <>
      <button onClick={handleOnClick}>{text}</button>
    </>
  )
}

const DisplayText = ({ story, num_votes }) => {
  return (
    <>
      <p>{story}<br />has {num_votes} votes</p>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initialVotes = [0, 0, 0, 0, 0, 0, 0, 0]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  const [maxVotesIndex, setMaxIndex] = useState(0)

  const RandomIndex = () => {
    const random_num = Math.floor(Math.random() * 8)
    setSelected(random_num)
  }

  const IncreaseVote = () => {
    const newVotes = votes.map((v, i) => {
      if(i === selected){
        if(v+1 > votes[maxVotesIndex]){
          const newMaxIndex = i
          setMaxIndex(newMaxIndex)
        }
        return v + 1
      }
      else{
        return v
      }
    })
    setVotes(newVotes)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayText story={anecdotes[selected]} num_votes={votes[selected]} />
      <Button handleOnClick={IncreaseVote} text='vote' />
      <Button handleOnClick={RandomIndex} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <DisplayText story={anecdotes[maxVotesIndex]} num_votes={votes[maxVotesIndex]} />
    </div>
  )
}
export default App