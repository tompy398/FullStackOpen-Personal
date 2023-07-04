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

/*
Section C Follow Along
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
*/

/*
//Exercise 2.11
import { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect( () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

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

/*
//Notes 2.d
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
    
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from the server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} toggleImportance={ () => toggleImportanceOf(note.id) } />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
*/

// Exercise 2.12-2.15
import { useState, useEffect } from 'react'
import personServices from './services/persons.js'

const Person = ({ person, onDelete }) => {
  return (
    <>
      <p>{person.name} {person.number} <button onClick={ () => onDelete(person.name, person.id)}>delete</button></p> 
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

const DisplayPersons = ({ persons, newFilter, onDelete}) => {
  const filteredArr = persons.filter( (person) => {
    return (person.name).toLowerCase().includes(newFilter)
  })

  return (
    <>
      {filteredArr.map( (filteredPerson) => {
        return <Person person={filteredPerson} onDelete={onDelete} key={filteredPerson.id} />
      })}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect( () => {
    personServices
      .getInitial()
      .then(response => {
        setPersons(response)
      })
  }, [])

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
      const old_person = persons.find(person => person.name === newName)
      if(window.confirm(`${old_person.name} is already added to the phonebook, replace the old number with a new one?`)){
        const new_person = {...old_person, number: newNumber}
        personServices
          .updateStuff(old_person.id, new_person)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== old_person.id ? person : returnedPerson)
            )
          })
      }
    }
    else{
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personServices
        .addNew(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert('Something went wrong at adding people!')
        })
      
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    console.log('Filter:', event.target.value)
    setNewFilter(event.target.value)
  }

  const onDelete = (name, id) => {
    if(window.confirm(`Delete ${name}?`)){ 
      personServices
      .deletePerson(id)
      .then( () => {
        console.log(`Seemingly successful deletion of persons of id ${id}.`)
        setPersons(
          persons.filter(person => person.id !== id)
        )
      })
      .catch( (error) => {
        alert("Something went wrong at deletion of a person!")
        console.log(error.message)
      }
        
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addInfo={addInfo}/>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} newFilter={newFilter} onDelete={onDelete}/>
    </div>
  )
}
export default App