const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL
console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (val) => {
                if (val.length < 8) {
                    return false
                }
                return true
            },
            message: 'String must be equal or greater 8 characters'
        },
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: (val) => {
                const re = new RegExp('^[0-9]{2,3}-[0-9]{6,}')
                return re.test(val)
            },
            message: 'The number must follow a strict format'
        },
        required: true
    }
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('PhoneInfo', phonebookSchema)