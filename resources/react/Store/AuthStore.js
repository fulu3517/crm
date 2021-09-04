import { observable, action, makeAutoObservable } from "mobx";
import jwt_decode from "jwt-decode";
import CryptoJS from "crypto-js";
import sign from "jwt-encode";
class AuthStore {
    appState = null;

    constructor() {
        makeAutoObservable(this, {
            appState: observable,
            saveToken: action,
            getToken: action
        })
    }

    saveToken = (appState) => {
        try {
            const cryptToken = CryptoJS.AES.encrypt(sign(appState, "secret"), "laravel-crm-app").toString();
            localStorage.setItem('appState',cryptToken);
            this.getToken();
        } catch (error) {
            console.log(error)
        }
    }

    getToken = () => {
        try {
            const appStateData = localStorage.getItem('appState');
            if (appStateData) {
                var bytes = CryptoJS.AES.decrypt(appStateData, "laravel-crm-app");
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                this.appState = jwt_decode(originalText);
            } else {
                this.appState = null;
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default new AuthStore();