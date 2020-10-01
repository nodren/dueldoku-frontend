import { Answers, Board, Score } from './types'

export function processScores(scores: Record<string, number>): [Score, Score] {
	const ret: any = Object.entries(scores).map(([id, score]) => {
		return {
			id,
			score,
		}
	})
	ret.sort((scoreA: Score, scoreB: Score) => {
		return scoreB.score - scoreA.score
	})
	return ret
}

export function formatAnswers(answers: Record<string, string>, id: string): Answers {
	const formattedAnswers: Answers = {}
	for (const [box, playerId] of Object.entries(answers)) {
		if (playerId === id) {
			formattedAnswers[box] = 'you'
		} else {
			formattedAnswers[box] = 'opponent'
		}
	}
	return formattedAnswers
}

export function countNumberOnBoard(board: Board, number: number) {
	const boardStr = convertBoardToString(board)
	return boardStr.split(number.toString()).length - 1
}

export function convertBoardToString(board: Board) {
	const boardRows = []
	for (const row of board) {
		boardRows.push(row.join(''))
	}
	return boardRows.join('')
}
