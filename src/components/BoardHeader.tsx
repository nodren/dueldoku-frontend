import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { capitalize } from 'lodash'

import { getDifficulty } from '../redux/selectors/board'
import { getDarkMode } from '../redux/selectors/settings'
import { Scores } from './Scores'

interface Props {
	singleMode?: boolean
}

export const BoardHeader: FC<Props> = ({ singleMode }) => {
	const dark = useSelector(getDarkMode)
	const difficulty = useSelector(getDifficulty)

	return (
		<>
			<style jsx>{`
				.header {
					background-color: #25292e;
					border-left: 1px solid ${dark ? '#FFF' : '#000'};
					border-top: 1px solid ${dark ? '#FFF' : '#000'};
					border-right: 1px solid ${dark ? '#FFF' : '#000'};
					display: flex;
					line-height: 14px;
					height: 20px;
				}
				.difficulty {
					flex: 1;
					margin-left: 5px;
				}
				.scores {
					flex: 1;
					margin-left: 5px;
				}
			`}</style>
			<div className="header">
				<div className="difficulty">{capitalize(difficulty)}</div>
				<Scores singleMode={singleMode} />
			</div>
		</>
	)
}
