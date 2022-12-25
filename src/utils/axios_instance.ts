import axios from 'axios'

export const instance = axios.create({
	headers: {
		"Content-Type": "application/json",
	},
	baseURL: "http://192.168.0.102:4000/user",
});