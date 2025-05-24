import { useState } from 'react'

const VoteStat = ({votes, selected}) => {
    // if (votes != votesArr) {
        return (
            <div>
                has {votes[selected]} votes
            </div>
            )
    // }
}

const MostVotes = ({votes, anecdotes}) => {
    const maxVotes = Math.max(...votes)
    // if (maxVotes > 0) {
        return (
            <div>
                {anecdotes[votes.indexOf(maxVotes)]}
            </div>
        )
    // }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const votesArr = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(votesArr)

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br />
      <VoteStat votes={votes} selected={selected} />
      <button onClick={vote}>vote</button>
      <button onClick = {nextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes} />
      <VoteStat votes={votes} selected={selected} />
    </div>
  )
}

export default App