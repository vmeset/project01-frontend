import {$authHost, $host} from './index'

export const createNote = async (note) => {
    const response = await $authHost.post('api/note/create', note)
    return response
}

export const fetchNotes = async (author, page, limit) => {
    const response = await $host.get('api/note/list', {params: {
        author, page, limit
    }})
    return response.data
}

export const deleteNote = async (id) => {
    const response = await $authHost.delete(`api/note/${id}`)
    return response.data
}

export const updateNote = async (note) => {
    const response = await $authHost.put('api/note/update', note)
    return response.data
}