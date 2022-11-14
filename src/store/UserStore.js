import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._accounts = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setAccounts(accounts) {
        this._accounts = accounts
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get accounts() {
        return this._accounts
    }

    deleteAccount(id) {
        this._accounts = this._accounts.filter(acc => acc._id !== id)
    }

    toggleRole(id, role) {
        this._accounts = this.accounts.map(acc => acc._id === id 
            ? {
                ...acc,
                role: role
            }
            : {...acc})
    }
}