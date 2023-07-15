import axios from "axios"

export const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: "https://voting-backend-jc4h2.ondigitalocean.app/user/",
})
