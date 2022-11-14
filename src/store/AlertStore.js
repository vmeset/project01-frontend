import { makeAutoObservable } from "mobx";

export default class AlertStore {
    constructor() {
        this._alertVisible = false
        this._type = ""
        this._text = ""
        this._modalType = ""
        this._modalText = ""
        this._modalId = ""
        this._modalVisible = false
        makeAutoObservable(this)
    }
    // setType(type) {
    //     this._type = type
    // }
    // setText(text) {
    //     this._text = text
    // }
    setAlertVisible(value) {
        this._alertVisible = value
    }
    setModalVisible(value) {
        this._modalVisible = value
    }
    showAlert(text, type) {
        this._type = type
        this._text = text
        this._alertVisible = true
    }
    showModal(type, text, id) {
        this._modalType = type
        this._modalText = text
        this._modalId = id
        this._modalVisible = true
    }
    hideAlert() {
        this._alertVisible = false
    }
    hideModal() {
        this._modalVisible = false
    }
    get modalId () {
        return this._modalId
    }
    get modalType () {
        return this._modalType
    }
    get modalText() {
        return this._modalText
    }
    get modalVisible () {
        return this._modalVisible
    }
    get type() {
        return this._type
    }
    get text() {
        return this._text
    }
    get alertVisible() {
        return this._alertVisible
    }
}