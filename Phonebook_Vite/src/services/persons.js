import axios from 'axios'
const baseUrl = 'api/persons'

const getInitial = () => {
    const request = axios.get(baseUrl)
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