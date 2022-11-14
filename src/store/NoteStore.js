import { makeAutoObservable } from "mobx";

export default class NoteStore {
    constructor() {
        this._types = [
            {id: 1, cat: 'todo'},
            {id: 2, cat: 'buy'}
        ]
        this._notes = []
        this._title = ""
        makeAutoObservable(this)
    }
    setTypes(types) {
        this._types = types
    }
    setNotes(notes) {
        this._notes = notes
    }
    setTitle(title) {
        this._title = title
    }
    get title() {
        return this._title
    }
    get types() {
        return this._types
    }
    get notes() {
        return this._notes
    }
    addNote(note) {
        this._notes.push(note)
    }
    removeNote(id) {
        this._notes = this._notes.filter(note => note._id !== id)
    }
    toggleNote(id) {
        this._notes = this.notes.map(note => note._id === id ? note.isCompleted = !note.isCompleted : note)
    }
}