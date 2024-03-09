import { SERVER_URL } from "../../utils/constants"

const loginUser = async (loginData) => {
    console.log('Login data: ', loginData)
    try {
        const LOGIN_URL = `${SERVER_URL}/auth/login`;
        console.log(LOGIN_URL)
        const response = await fetch(LOGIN_URL, {
            method: "post",
            body: JSON.stringify(loginData),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        console.log(`Response Data `, data)
        if (data.status === "fail") {
            throw new Error(JSON.stringify(data.errors));
        }
        return data;
    } catch (error) {
        /**
         * @type {string}
         */
        const message = error.message
        if(!message.startsWith('{')) {
            throw new Error(data.message)
        }
        throw error
    }
}

const registerUser = async (registerData) => {
    try {
        const REGISTER_URL = `${SERVER_URL}/auth/register`;
        console.log(REGISTER_URL)
        const response = await fetch(REGISTER_URL, {
            method: "post",
            body: JSON.stringify(registerData),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json();
        console.log('Response Data: ', data)
        if (data.status === "fail") {
            throw new Error(data.errors)
        }
        return data;
    } catch (error) {
        console.error(`[Register User] `, error);
        throw error;
    }
}

const logoutUser = async () => {
    try {
        const LOGOUT_URL = `${SERVER_URL}/auth/logout`;
        const response = await fetch(LOGOUT_URL, {
            credentials: "include"
        })
        const data = await response.json();
        if (data.status === "fail") {
            throw new Error(data.message);
        }
        return data
    } catch (error) {

    }
}

export {
    loginUser,
    registerUser,
    logoutUser
}