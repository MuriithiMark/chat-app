import { io } from "socket.io-client";

import { SERVER_URL } from "../../utils/constants.js";

const socket = io(SERVER_URL)

const chatSocket = io(`${SERVER_URL}/friend`, { autoConnect: false});
const groupSocket = io(`${SERVER_URL}/group`, { autoConnect: false});
const notificationSocket = io(`${SERVER_URL}/notification`)

socket.io.on("error", (error) => {
    console.error(`[Socket Error] `, error);
    return;
})

chatSocket.onAny((event, ...args) => {
    console.log(event, args)
})

groupSocket.onAny((event, ...args) => {
    console.log(event, args)
})

notificationSocket.onAny((event, ...args) => {
    console.log(event, args)
})

chatSocket.on("new", (response) => {
    console.log(response)
})

chatSocket.on("connect", () => {
    console.log('Client connected ')
})

export {
    socket,
    chatSocket,
    groupSocket,
    notificationSocket
};