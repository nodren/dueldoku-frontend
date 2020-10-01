import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Header, Label, Modal, Table } from 'semantic-ui-react'
import { useActions } from '../hooks/redux'
import {
	setDarkMode,
	setHighlightNumbers,
	setHighlightRows,
	setValidateAnswers,
} from '../redux/actions/settings'
import {
	getDarkMode,
	getHighlightNumbers,
	getHighlightRows,
	getValidateAnswers,
} from '../redux/selectors/settings'

export const Menu: FC = () => {
	const [showSettings, setShowSettings] = useState(false)
	const dark = useSelector(getDarkMode)
	const highlightRows = useSelector(getHighlightRows)
	const highlightNumbers = useSelector(getHighlightNumbers)
	const validateAnswers = useSelector(getValidateAnswers)

	const actions = useActions({
		setDarkMode,
		setHighlightRows,
		setHighlightNumbers,
		setValidateAnswers,
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
					<Form.Field>
						<Form.Checkbox
							className={dark ? 'dark' : ''}
							label="Validate Answers (Single player only)"
							toggle
							checked={validateAnswers}
							onChange={() => actions.setValidateAnswers(!validateAnswers)}
						/>
					</Form.Field>
					<Form.Field>
						<Form.Checkbox
							className={dark ? 'dark' : ''}
							label="Highlight Rows & Columns"
							toggle
							checked={highlightRows}
							onChange={() => actions.setHighlightRows(!highlightRows)}
						/>
					</Form.Field>
					<Form.Field>
						<Form.Checkbox
							className={dark ? 'dark' : ''}
							label="Highlight numbers that match the active number"
							toggle
							checked={highlightNumbers}
							onChange={() => actions.setHighlightNumbers(!highlightNumbers)}
						/>
					</Form.Field>
				</Form>
				<Header as="h4" inverted={dark}>
					Keyboard Shortcuts
					<Table celled unstackable inverted={dark}>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Key</Table.HeaderCell>
								<Table.HeaderCell>Action</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>
									<Label ribbon color="blue">
										0-9
									</Label>
								</Table.Cell>
								<Table.Cell>Enters respective number into selected tile</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<Label ribbon color="blue">
										h
									</Label>
								</Table.Cell>
								<Table.Cell>Gives answer at selected tile</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<Label ribbon color="blue">
										e
									</Label>
								</Table.Cell>
								<Table.Cell>Erase contents of tile</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>
									<Label ribbon color="blue">
										n
									</Label>
								</Table.Cell>
								<Table.Cell>Toggle Note mode</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Header>
			</Modal.Content>
		</Modal>
	)
}
