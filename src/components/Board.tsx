import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { useActions } from '../hooks/redux'
import { setActiveBox, setActiveNumber } from '../redux/actions/board'
import {
	getActiveBox,
	getActiveNumber,
	getAnswers,
	getBoard,
	getNotes,
	getSolution,
} from '../redux/selectors/board'
import {
	getDarkMode,
	getHighlightNumbers,
	getHighlightRows,
	getValidateAnswers,
} from '../redux/selectors/settings'
import { getBoxCoords, isError } from '../utils'
import { Grid } from './Grid'

export const Board: FC = () => {
	const dark = useSelector(getDarkMode)
	const board = useSelector(getBoard)

	return (
		<>
			<style jsx global>{`
				.board {
					border: 2px solid ${dark ? '#fff' : '#000'};
					background-color: ${dark ? '#25292e' : '#e4decc'};
				}
			`}</style>
			<Grid columns={1} rows={9} className="board">
				{board.map((row, idx) => (
					<Row border={idx !== 0 && idx % 3 === 0} key={`row${idx}`} rowNum={idx} />
				))}
			</Grid>
		</>
	)
}

interface RowProps {
	border: boolean
	rowNum: number
}

const Row: FC<RowProps> = ({ border, rowNum }) => {
	const dark = useSelector(getDarkMode)
	const board = useSelector(getBoard)

	return (
		<>
			<style global jsx>{`
				.row-border {
					border-top: 2px solid ${dark ? '#aaa' : '#333'};
				}
			`}</style>
			<Grid className={border ? 'row-border' : ''} columns={9} rows={1}>
				{board[rowNum].map((square, idx) => (
					<Box rowNum={rowNum} columnNum={idx} key={`box${rowNum}${idx}`} />
				))}
			</Grid>
		</>
	)
}

interface BoxProps {
	rowNum: number
	columnNum: number
}

const Box: FC<BoxProps> = ({ rowNum, columnNum }) => {
	const dark = useSelector(getDarkMode)
	const board = useSelector(getBoard)
	const activeBox = useSelector(getActiveBox)
	const solution = useSelector(getSolution)
	const activeNumber = useSelector(getActiveNumber)
	const answers = useSelector(getAnswers)
	const hilightRows = useSelector(getHighlightRows)
	const hilightNumbers = useSelector(getHighlightNumbers)
	const validateAnswers = useSelector(getValidateAnswers)

	const actions = useActions({
		setActiveBox,
		setActiveNumber,
	})

	const square = board[rowNum][columnNum]
	const activeBoxCoords = activeBox ? getBoxCoords(activeBox[1], activeBox[0]) : undefined
	const boxCoords = getBoxCoords(rowNum, columnNum)

	const classNames = classnames({
		error: isError(rowNum, columnNum, board, solution, validateAnswers),
		active: activeBox?.[0] === columnNum && activeBox?.[1] === rowNum,
		['semi-active']:
			hilightRows &&
			((activeBox?.[0] === columnNum && activeBox?.[1] !== rowNum) ||
				(activeBox?.[0] !== columnNum && activeBox?.[1] === rowNum) ||
				(activeBoxCoords && isEqual(boxCoords, activeBoxCoords))),
		border: columnNum !== 0 && columnNum % 3 === 0,
		['active-number']: hilightNumbers && square !== 0 && square === activeNumber,
		['your-guess']: answers[`${columnNum}:${rowNum}`] === 'you',
		['opponent-guess']: answers[`${columnNum}:${rowNum}`] === 'opponent',
		box: true,
	})
	const onClick = () => {
		actions.setActiveBox([columnNum, rowNum])
		actions.setActiveNumber(square)
	}

	return (
		<>
			<style jsx>{`
				.box {
					border: 1px solid ${dark ? '#666' : '#aaa'};
					text-align: center;
					line-height: 3rem;
					font-size: 30px;
				}
				.border {
					border-left: 2px solid ${dark ? '#aaa' : '#333'};
				}
				.active {
					color: white;
					background-color: ${dark ? 'dodgerblue' : 'lightblue'} !important;
				}
				.active.your-guess {
					color: blue !important;
				}
				.active.opponent-guess {
					color: darkorange !important;
				}
				.active.error {
					color: ${dark ? 'darkred' : 'red'} !important;
				}
				.semi-active {
					background-color: ${dark
						? 'rgba(255, 255, 255, 0.1)'
						: 'rgba(32, 32, 32, 0.1)'};
				}
				.active-number {
					background-color: ${dark
						? 'rgba(128, 128, 128, 0.5)'
						: 'rgba(64, 64, 64, 0.2)'};
					font-weight: bolder;
				}
				.your-guess {
					color: ${dark ? 'dodgerblue' : 'blue'};
				}
				.opponent-guess {
					color: orange;
				}
				.error {
					color: ${dark ? 'darkred' : 'red'};
				}
			`}</style>
			<div className={classNames} onClick={onClick}>
				{square === 0 ? <BoxNotes rowNum={rowNum} columnNum={columnNum} /> : square}
			</div>
		</>
	)
}

const BoxNotes: FC<BoxProps> = ({ rowNum, columnNum }) => {
	const dark = useSelector(getDarkMode)
	const notes = useSelector(getNotes)
	const activeNumber = useSelector(getActiveNumber)
	const hilightNumbers = useSelector(getHighlightNumbers)

	const note = notes[rowNum]?.[columnNum] || {}

	const classNames = (number: number) =>
		classnames({
			['active-number']: hilightNumbers && number === activeNumber,
			note: true,
		})
	return (
		<>
			<style jsx>{`
				.note {
					color: ${dark ? '#eee' : '#111'};
					font-size: 12px;
					line-height: 1rem;
				}
				.active-number {
					color: ${dark ? '#fff' : '#000'};
					font-weight: 900;
				}
			`}</style>
			<Grid columns={3} rows={3}>
				<div className={classNames(1)}>{note?.[1] ? '1' : ''}</div>
				<div className={classNames(2)}>{note?.[2] ? '2' : ''}</div>
				<div className={classNames(3)}>{note?.[3] ? '3' : ''}</div>
				<div className={classNames(4)}>{note?.[4] ? '4' : ''}</div>
				<div className={classNames(5)}>{note?.[5] ? '5' : ''}</div>
				<div className={classNames(6)}>{note?.[6] ? '6' : ''}</div>
				<div className={classNames(7)}>{note?.[7] ? '7' : ''}</div>
				<div className={classNames(8)}>{note?.[8] ? '8' : ''}</div>
				<div className={classNames(9)}>{note?.[9] ? '9' : ''}</div>
			</Grid>
		</>
	)
}
