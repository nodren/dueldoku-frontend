import classnames from 'classnames'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { getActiveNumber, getBoard, getNumLock } from '../redux/selectors/board'
import { getDarkMode } from '../redux/selectors/settings'
import { countNumberOnBoard } from '../utils'

interface Props {
	number: number
	onClick?: () => void
}

export const NumberButton: FC<Props> = ({ number, onClick }) => {
	const board = useSelector(getBoard)
	const dark = useSelector(getDarkMode)
	const numLock = useSelector(getNumLock)
	const activeNumber = useSelector(getActiveNumber)

	const hide = countNumberOnBoard(board, number) === 9
	const classNames = classnames({
		hide: hide,
		dark,
		active: numLock && activeNumber === number,
		['number-button']: true,
	})
	return (
		<>
			<style jsx>{`
				.number-button {
					border: 0 none;
					background: transparent;
					font-weight: bolder;
					font-size: 30px;
					line-height: 54px;
					text-align: center;
					cursor: pointer;
				}
				.number-button:focus {
					border: 0 none;
					outline: none;
				}
				.number-button.dark {
					color: white;
				}
				.number-button:hover,
				.number-button.active {
					border-bottom: 2px solid;
				}
				.hide {
					visibility: hidden;
				}
			`}</style>
			<button className={classNames} onClick={onClick}>
				{number}
			</button>
		</>
	)
}
