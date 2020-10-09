import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Label, Table } from 'semantic-ui-react'
import numeral from 'numeral'

import { getScores } from '../redux/selectors/scores'
import { getDarkMode } from '../redux/selectors/settings'
import { getSocket } from '../socket'
import { processScores } from '../utils'

const socket = getSocket()

interface Props {
	singleMode?: boolean
}

export const Scores: FC<Props> = ({ singleMode }) => {
	const dark = useSelector(getDarkMode)
	const scores = useSelector(getScores)

	if (singleMode) {
		const you = processScores(scores).find((s) => s.id === 'you')

		return (
			<>
				<style jsx>{`
					.scores {
						flex: 1;
						margin-left: 5px;
					}
				`}</style>
				<div className="scores">{numeral(you?.score).format('0,0')}</div>
			</>
		)
	}

	const you = processScores(scores).find((s) => s.id === socket.id)
	const opponent = processScores(scores).find((s) => s.id !== socket.id)

	return (
		<>
			<style jsx>{`
				.scores {
					display: flex;
					flex: 1;
					margin-left: 5px;
				}
				.you {
					color: ${dark ? 'dodgerblue' : 'blue'};
				}
				.opponent {
					color: orange;
					margin-left: 15px;
				}
				.winning {
					font-weight: bold;
				}
			`}</style>
			<div className="scores">
				<div className={`you ${you?.score > opponent?.score ? 'winning' : ''}`}>
					{numeral(you?.score || 0).format('0,0')}
				</div>
				<div className={`opponent ${opponent?.score > you?.score ? 'winning' : ''}`}>
					{numeral(opponent?.score || 0).format('0,0')}
				</div>
			</div>
		</>
	)
}

export const ScoresTable: FC = () => {
	const scores = useSelector(getScores)
	const dark = useSelector(getDarkMode)

	return (
		<Table celled unstackable inverted={dark}>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Scores</Table.HeaderCell>
					<Table.HeaderCell />
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{processScores(scores).map((score) => (
					<Table.Row key={`scoreRow_${score.id}`}>
						<Table.Cell>
							<Label
								ribbon
								color={`${score.id === socket.id ? 'blue' : 'orange'}` as any}
							>
								{score.id === socket.id ? 'You' : 'Opponent'}
							</Label>
						</Table.Cell>
						<Table.Cell>{score.score.toLocaleString()}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	)
}
