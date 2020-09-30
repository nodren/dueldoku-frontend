import React, { FC, useEffect } from 'react'
import { Button, Header } from 'semantic-ui-react'

import { useTheme } from '../hooks/useDarkMode'
import { Grid } from './Grid'
import { Menu } from './Menu'

export const Theme: FC = ({ children }) => {
	const { dark, checkDarkMode } = useTheme()

	useEffect(() => {
		checkDarkMode()
		console.log('checked')
	}, [])

	const fullScreen = () => {
		// full screen attempt
		const rootElem = document.getElementById('root')
		if (!document.fullscreenElement) {
			rootElem!.requestFullscreen().catch((err) => {
				console.log('FAILED!', err)
			})
		} else {
			document.exitFullscreen()
		}
	}

	return (
		<>
			<style jsx>{`
				.container {
					display: grid;
					margin: auto;
					padding-top: 2rem;
					width: 390px;
				}
				.page {
					margin-top: 1rem;
					display: grid;
				}
			`}</style>

			<div className={`wrapper ${dark ? 'dark' : ''}`}>
				<div className="container">
					<Grid columns="1fr auto auto">
						<Header as="h3" inverted={dark}>
							Duelduko
						</Header>
						<Menu />
						<Button icon="expand" onClick={fullScreen} size="tiny" />
					</Grid>
					<div className="page">{children}</div>
				</div>
			</div>
		</>
	)
}
