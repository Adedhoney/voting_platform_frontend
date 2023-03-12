import axios from "axios"

export const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: "https://voting-platform-backend-mnjhw.ondigitalocean.app/user/",
})
