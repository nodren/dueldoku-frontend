import io from 'socket.io-client'

const socket = io(`${process.env.API_SERVER}`)

export function getSocket() {
	return socket
}
