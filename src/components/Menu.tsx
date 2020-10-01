import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import { useActions } from '../hooks/redux'
import { setDarkMode } from '../redux/actions/settings'
import { getDarkMode } from '../redux/selectors/settings'

export const Menu: FC = () => {
	const [showSettings, setShowSettings] = useState(false)
	const dark = useSelector(getDarkMode)

	const actions = useActions({
		setDarkMode,
	})

	return (
		<Modal
			className={dark ? 'dark' : ''}
			closeIcon
			open={showSettings}
			onOpen={() => setShowSettings(true)}
			onClose={() => setShowSettings(false)}
			trigger={<Button icon="settings" size="tiny" />}
		>
			<Modal.Header>Settings</Modal.Header>
			<Modal.Content>
				<Form>
					<Form.Field>
						<Form.Checkbox
							className={dark ? 'dark' : ''}
							label="Dark Mode"
							toggle
							checked={dark}
							onChange={() => actions.setDarkMode(!dark)}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
		</Modal>
	)
}
