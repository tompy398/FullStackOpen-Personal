require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

/* Database Stuff */
// Nothing here yet lol
const PhoneInfo = require('./models/phonebook')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Sup Dude!</h1>')
})

app.get('/api/persons', (request, response) => {
    PhoneInfo.find({})
        .then( phones => {
            console.log(phones)
            response.json(phones)
        })
})

app.get('/info', (request, response) => {
    PhoneInfo.countDocuments({})
        .then( amt_people => {
            
            const event = new Date()
            response.send(`
                <p>Phonebook has info for ${amt_people} people</p>
                <p>${event.toString()}</
            `)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    PhoneInfo.findById(request.params.id)
        .then( person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    PhoneInfo.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: 'name or number missing'})
    }

    const person = new PhoneInfo({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const phone = {
        name: body.name,
        number: body.number
    }
    PhoneInfo.findByIdAndUpdate(request.params.id, phone, { new: true })
        .then(updatedInfo => {
            response.json(updatedInfo)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(400).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    if (err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message })
    }
    
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})