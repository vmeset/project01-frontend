import {$authHost, $host} from './index'
import jwt_decode from "jwt-decode";

export const registration = async (username, password) => {
    const response = await $host.post('api/user/registration', {username, password})
    return response.data
}

export const login = async (username, password) => {
    const response = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}

export const check = async () => {
    const response = await $authHost.get('api/user/check')
    // localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}

export const fetchAccounts = async () => {
    const response = await $authHost.get('api/user/fetch')
    return response.data
}

export const updateRole = async (user) => {
    const response = await $authHost.put('api/user/update', user)
    return response.data
}

export const deleteAccount = async (id) => {
    // const response = await $authHost.delete(`api/note/${id}`)
    const response = await $authHost.delete(`api/user/${id}`)
    return response.data
}