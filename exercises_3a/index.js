const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('data', function getData (req) {
    return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = persons.length + 1
    return Math.trunc(Math.random() * (1000000 - (maxId + 1)) + (maxId + 1));
}

app.get('/', (request, response) => {
    response.send('<h1>Sup Dude!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const amt_people = persons.length
    const event = new Date()

    response.send(`
        <p>Phonebook has info for ${amt_people} people</p>
        <p>${event.toString()}
    `)

})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {
        return person.id === id
    })

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log('New Notes:', persons)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'Name and Number Missing'
        })
    }
    if (!body.name) {
        return response.status(400).json({
            error: 'Name Missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'Number Missing'
        })
    }

    const existence = persons.find( person => person.name.toLowerCase() === body.name.toLowerCase())
    if (existence) {
        return response.status(400).json({
            error: 'Name Must Be Unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    console.log(persons)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})