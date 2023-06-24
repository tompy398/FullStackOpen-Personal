/*
// Examples
import Note from './components/Note'

const App = ({ notes }) => {
  const result = notes.map(note => note.id)
  console.log(result)
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key ={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}
*/

/*
// Exercises 2.1-2.5
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => {
        return <Course key={course.id} course={course} /> 
        }
      )}
    </div>
  )
}
*/

/*
// Forms Part 2 Follow Along
import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
*/

/*
// Exercise 2.6-2.10
import { useState } from 'react'

const Person = ({ name, phoneNumber }) => {
  return (
    <>
      <p>{name} {phoneNumber}</p>
    </>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return(
    <form>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
    </form>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addInfo }) => {
  return(
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={addInfo} >add</button>
      </div>
    </form>
  )
}

const DisplayPersons = ({ persons, newFilter}) => {
  const filteredArr = persons.filter( (person) => {
    return (person.name).toLowerCase().includes(newFilter)
  })

  return (
    <>
      {filteredArr.map( (filteredPerson) => {
        return <Person name={filteredPerson.name} phoneNumber={filteredPerson.number} key={filteredPerson.id} />
      })}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNumberChange = (event) => {
    console.log('Number:', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log('Name:', event.target.value)
    setNewName(event.target.value)
  }

  const addInfo = (event) => {
    event.preventDefault()

    const already_exists = persons.reduce( (valid, person) => {
      return valid || (person.name === newName)
    }, false)

    if(already_exists){
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else{
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = (event) => {
    console.log('Filter:', event.target.value)
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addInfo={addInfo}/>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} newFilter={newFilter} />
    </div>
  )
}
*/

import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNotes, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  useEffect(hook, [])

  console.log('render', notes.length, 'notes')
}

export default App