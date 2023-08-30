const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://vothanh31459:${password}@cluster0.vxk8awa.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
        name: String,
        number: String
    })
const PhoneInfo = mongoose.model('PhoneInfo', phonebookSchema)

if (process.argv.length > 3) {
    const phoneName = process.argv[3]
    const phoneNumber = process.argv[4]

    const info = new PhoneInfo({
        name: phoneName,
        number: phoneNumber
    })

    info.save().then( (result) => {
        console.log(`added ${phoneName} number ${phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
}
else {
    PhoneInfo.find({}).then( (result) => {
        result.forEach(info => {
            console.log(info)
        })
        mongoose.connection.close()
    })
}


