import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'

import { useActions } from '../hooks/redux'
import { setActiveBox, setActiveNumber, setNotes, setNotesMode } from '../redux/actions/board'
import {
	getActiveBox,
	getBoard,
	getNotes,
	getNotesMode,
	getSolution,
} from '../redux/selectors/board'
import { Grid } from './Grid'
import { NumberButton } from './NumberButton'
import { Scores } from './Scores'

interface Props {
	onNumber: (number: number) => void
	onHint: () => void
	onErase: () => void
	noScores?: boolean
}

export const Controls: FC<Props> = ({ onNumber, onHint, onErase, noScores }) => {
	const notesMode = useSelector(getNotesMode)
	const solution = useSelector(getSolution)
	const board = useSelector(getBoard)
	const notes = useSelector(getNotes)
	const activeBox = useSelector(getActiveBox)

	const actions = useActions({
		setActiveBox,
		setActiveNumber,
		setNotes,
		setNotesMode,
	})

	const onNumberClick = (number: number) => () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== 0 && boardSquare === solutionSquare) {
			//there's an answer and it's correct
			return
		}
		if (notesMode) {
			if (!notes[activeBox[1]]) {
				notes[activeBox[1]] = [] as any
			}
			if (!notes[activeBox[1]][activeBox[0]]) {
				notes[activeBox[1]][activeBox[0]] = {}
			}
			notes[activeBox[1]][activeBox[0]][number] = !notes[activeBox[1]][activeBox[0]][number]
			actions.setNotes(notes)
		} else {
			onNumber(number)
			actions.setActiveNumber(number)
			//update here... maybe
		}
	}

	const onHintClick = () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]
		if (boardSquare !== 0 && boardSquare === solutionSquare) {
			return
		}
		onHint()
	}

	const onEraseClick = () => {
		const boardSquare = board[activeBox[1]][activeBox[0]]
		const solutionSquare = solution[activeBox[1]][activeBox[0]]

		if (boardSquare === solutionSquare) {
			return
		}
		if (boardSquare !== 0) {
			onErase()
			return
		}
		if (!notes[activeBox[1]]) {
			notes[activeBox[1]] = [] as any
		}
		if (!notes[activeBox[1]][activeBox[0]]) {
			notes[activeBox[1]][activeBox[0]] = {}
		}
		notes[activeBox[1]][activeBox[0]] = {}
		actions.setNotes(notes)
		// refresh the board, react isn't handling a deep object update well
		// const oldActive = [...activeBox]
		// actions.setActiveBox([0, 0])
		// actions.setActiveBox(oldActive as any)
	}

	return (
		<Grid rows="auto auto auto">
			<Grid columns="1fr auto 1fr" padding="1rem">
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
			{!noScores && <Scores />}
		</Grid>
	)
}
