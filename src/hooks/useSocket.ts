import { useEffect } from 'react'

import { getSocket } from '../socket'

const socket = getSocket()

export default function useSocket(eventName: string, cb: Function) {
	useEffect(() => {
		socket.on(eventName, cb)

		return function useSocketCleanup() {
			socket.off(eventName, cb)
		}
	}, [eventName, cb])

	return socket
}
