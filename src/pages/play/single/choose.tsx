import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Button, Header } from 'semantic-ui-react'

import { getDarkMode } from '../../../redux/selectors/settings'

export default function Home() {
	const dark = useSelector(getDarkMode)

	return (
		<>
			<Header as="h4" inverted={dark} textAlign="center">
				Choose difficulty
			</Header>
			<Button.Group vertical>
				<Link href="/play/single/easy">
					<Button>Easy</Button>
				</Link>
				<Link href="/play/single/medium">
					<Button>Medium</Button>
				</Link>
				<Link href="/play/single/hard">
					<Button>Hard</Button>
				</Link>
				<Link href="/play/single/expert">
					<Button>Expert</Button>
				</Link>
			</Button.Group>
		</>
	)
}
