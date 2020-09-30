import Link from 'next/link'
import { Button, Header } from 'semantic-ui-react'

import { useTheme } from '../../../hooks/useDarkMode'

export default function Home() {
	const { dark } = useTheme()

	return (
		<>
			<Header as="h4" inverted={dark} textAlign="center">
				Choose difficulty
			</Header>
			<Button.Group vertical>
				<Link href="/wait/easy">
					<Button>Easy</Button>
				</Link>
				<Link href="/wait/medium">
					<Button>Medium</Button>
				</Link>
				<Link href="/wait/hard">
					<Button>Hard</Button>
				</Link>
				<Link href="/wait/expert">
					<Button>Expert</Button>
				</Link>
			</Button.Group>
		</>
	)
}
