import axios from 'axios'

export const instance = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
	baseURL: "http://localhost:4000/user",
});