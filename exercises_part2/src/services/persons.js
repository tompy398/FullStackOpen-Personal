import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getInitial = () => {
    const request = axios.get('http://localhost:3001/initialPersons')
    return request.then( (response) => {
        return response.data
    })
}

const addNew = newPersonObj => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const updateStuff = (id, newPersonObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newPersonObj)
    return request.then(response => response.data)
}

export default { getInitial, addNew, deletePerson, updateStuff }