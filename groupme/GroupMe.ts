import axios, { AxiosInstance } from "axios"

class GroupMe {
    ACCESS_TOKEN: string
    SESSION: AxiosInstance


    constructor(access_token: string) {
        this.ACCESS_TOKEN = access_token
        this.SESSION = axios.create()
    }

    FindGroups()
}