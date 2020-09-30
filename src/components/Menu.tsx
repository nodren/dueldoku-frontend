import React, { FC, useState } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

import { useTheme } from '../hooks/useDarkMode'

export const Menu: FC = () => {
	const [showSettings, setShowSettings] = useState(false)
	const { dark, setDarkMode } = useTheme()

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
							onChange={() => setDarkMode(!dark)}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
		</Modal>
	)
}
