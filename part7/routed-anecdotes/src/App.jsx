import { useState } from 'react'
import { Menu } from './components/Menu'
import { AnecdoteList } from './components/AnecdoteList'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { CreateNew } from './components/CreateNew'
import { Anecdote } from './components/Anecdote'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <p>{notification}</p>
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew anecdotes={anecdotes} setNotification={setNotification} setAnecdotes={setAnecdotes} />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App
