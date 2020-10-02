import { cloneDeep } from 'lodash'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useKey, useKeyPressEvent } from 'react-use'
import { Button, Icon } from 'semantic-ui-react'

import { useActions } from '../hooks/redux'
import {
	setActiveBox,
	setActiveNumber,
	setAnswers,
	setNotes,
	setNotesMode,
} from '../redux/actions/board'
import {
	getActiveBox,
	getAnswers,
	getBoard,
	getNotes,
	getNotesMode,
	getSolution,
} from '../redux/selectors/board'
import { getValidateAnswers } from '../redux/selectors/settings'
import { Grid } from './Grid'
import { NumberButton } from './NumberButton'
import { Scores } from './Scores'

interface Props {
	onNumber: (number: number) => void
	onHint: () => void
	onErase: () => void
	singleMode?: boolean
}

export const Controls: FC<Props> = ({ onNumber, onHint, onErase, singleMode }) => {
	const notesMode = useSelector(getNotesMode)
	const solution = useSelector(getSolution)
	const board = useSelector(getBoard)
	const notes = useSelector(getNotes)
	const activeBox = useSelector(getActiveBox)
	const validateAnswers = useSelector(getValidateAnswers)
	const answers = useSelector(getAnswers)

	const checkSolution = !singleMode || validateAnswers

	const actions = useActions({
		setActiveBox,
		setActiveNumber,
		setNotes,
		setNotesMode,
		setAnswers,
	})

	const onNumberClick = (number: number) => () => {
		if (!activeBox) {
			// no active choice
			return
		}
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (checkSolution && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		if (notesMode) {
			const editNotes = cloneDeep(notes)
			if (!editNotes[activeBox[1]]) {
				editNotes[activeBox[1]] = [] as any
			}
			if (!editNotes[activeBox[1]][activeBox[0]]) {
				editNotes[activeBox[1]][activeBox[0]] = {}
			}
			editNotes[activeBox[1]][activeBox[0]][number] = !editNotes[activeBox[1]][activeBox[0]][
				number
			]
			actions.setNotes(editNotes)
		} else {
			if (number === boardSquare) {
				number = 0
			}
			onNumber(number)
			actions.setActiveNumber(number)
			//update here... maybe
		}
	}

	const onHintClick = () => {
		if (!activeBox) {
			// no active choice
			return
		}
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== 0 && boardSquare === solutionSquare) {
			return
		}
		onHint()
	}

	const onEraseClick = () => {
		if (!activeBox) {
			// no active choice
			return
		}
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		const editNotes = cloneDeep(notes)

		if (checkSolution && boardSquare === solutionSquare) {
			return
		}
		if (boardSquare !== 0) {
			onErase()
		}
		if (!editNotes[activeBox[1]]) {
			editNotes[activeBox[1]] = [] as any
		}
		if (!editNotes[activeBox[1]][activeBox[0]]) {
			editNotes[activeBox[1]][activeBox[0]] = {}
		}
		editNotes[activeBox[1]][activeBox[0]] = {}
		actions.setNotes(editNotes)
		const editAnswers = cloneDeep(answers)
		delete editAnswers[`${activeBox[0]}:${activeBox[1]}`]
		actions.setAnswers(editAnswers)
	}

	useKeyPressEvent('1', null, onNumberClick(1))
	useKeyPressEvent('2', null, onNumberClick(2))
	useKeyPressEvent('3', null, onNumberClick(3))
	useKeyPressEvent('4', null, onNumberClick(4))
	useKeyPressEvent('5', null, onNumberClick(5))
	useKeyPressEvent('6', null, onNumberClick(6))
	useKeyPressEvent('7', null, onNumberClick(7))
	useKeyPressEvent('8', null, onNumberClick(8))
	useKeyPressEvent('9', null, onNumberClick(9))
	useKeyPressEvent('n', null, () => actions.setNotesMode(!notesMode))
	useKeyPressEvent('h', null, onHintClick)
	useKeyPressEvent('e', null, onEraseClick)

	return (
		<Grid rows="auto auto auto">
			<Grid columns="1fr auto 1fr" padding="10px">
				<div />
				<Button.Group>
					<Button onClick={onEraseClick}>
						<Icon name="eraser" />
						Erase
					</Button>
					<Button
						toggle
						active={notesMode}
						onClick={() => actions.setNotesMode(!notesMode)}
					>
						<Icon name="sticky note outline" />
						Notes {notesMode ? 'On' : 'Off'}
					</Button>
					<Button onClick={onHintClick}>
						<Icon name="lightbulb outline" />
						Hint
					</Button>
				</Button.Group>
				<div />
			</Grid>
			<Grid columns={9} rows="auto auto">
				<NumberButton number={1} onClick={onNumberClick(1)} />
				<NumberButton number={2} onClick={onNumberClick(2)} />
				<NumberButton number={3} onClick={onNumberClick(3)} />
				<NumberButton number={4} onClick={onNumberClick(4)} />
				<NumberButton number={5} onClick={onNumberClick(5)} />
				<NumberButton number={6} onClick={onNumberClick(6)} />
				<NumberButton number={7} onClick={onNumberClick(7)} />
				<NumberButton number={8} onClick={onNumberClick(8)} />
				<NumberButton number={9} onClick={onNumberClick(9)} />
			</Grid>
			{!singleMode && <Scores />}
		</Grid>
	)
}
