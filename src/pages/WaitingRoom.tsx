import copy from 'copy-to-clipboard'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Header, Loader, Popup } from 'semantic-ui-react'

import { useActions } from '../hooks/redux'
import useSocket from '../hooks/useSocket'
import { fetchUuid, setUuid } from '../redux/actions/settings'
import { getDarkMode, getUuid } from '../redux/selectors/settings'

export const WaitingRoom: FC = () => {
	const dark = useSelector(getDarkMode)
	const uuid = useSelector(getUuid)
	const actions = useActions({
		setUuid,
		fetchUuid,
	})
	const [loading, setLoading] = useState(true)
	const [showPopup, setShowPopup] = useState(false)

	const history = useHistory()
	const params = useParams<{ mode: string }>()

	const socket = useSocket('joined', (data) => {
		console.log('joined!', data)
		history.push(`/play/${params.mode}/${uuid}`)
	})

	useEffect(() => {
		if (uuid) {
			console.log('START', uuid)
			socket.emit('start', uuid)
			setLoading(false)
			return
		}
		actions.fetchUuid()
	}, [uuid])

	const onCopy = () => {
		copy(`${document.location.protocol}//${document.location.host}/join/${uuid}`)
		setShowPopup(true)
		setTimeout(() => {
			setShowPopup(false)
		}, 2500)
	}

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<style jsx>{`
				.start {
					text-align: center;
				}
			`}</style>
			<div className="start">
				<Header as="h2" inverted={dark}>
					Waiting room
				</Header>
				<p>Waiting for opponent, click button to copy URL and share with your opponent</p>
				<Popup
					trigger={
						<Button
							onClick={onCopy}
						>{`${document.location.protocol}//${document.location.host}/join/${uuid}`}</Button>
					}
					content="Copied!"
					on="click"
					onOpen={onCopy}
					open={showPopup}
					position="bottom center"
				/>
			</div>
		</>
	)
}
