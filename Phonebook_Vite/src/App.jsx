// Exercise 2.12-2.15
import { useState, useEffect } from 'react'
import personServices from './services/persons.js'

const Person = ({ person, onDelete }) => {
  return (
    <p>{person.name} {person.number} <button onClick={ () => onDelete(person.name, person.id)}>delete</button></p> 
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

const Notification = ({ message, errMessage}) => {
    
  const success_notificationStyle = {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'gray',
    border: '2px solid green',
    padding: '5px',
    fontSize: '20px'
  }

  if (message === null && errMessage === null) {
    return null
  }

  if (message) {
    return (
      <div className='success_add' style={success_notificationStyle}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setMessage] = useState(null)
  const [newErrMessage, setErrMessage] = useState(null)

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
          setMessage(response.name + ' was successfully added')
        })
        .catch(error => {
          setMessage(error.response.data.error)
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
      <Notification message={newMessage} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addInfo={addInfo} />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} newFilter={newFilter} onDelete={onDelete} />
    </div>
  )
}

export default App