import './styles/dark.css'
import 'semantic-ui-css/semantic.min.css'

import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { Join } from './pages/Join'
import { MultiChoose } from './pages/MultiChoose'
import { Play } from './pages/Play'
import { SingleChoose } from './pages/SingleChoose'
import { WaitingRoom } from './pages/WaitingRoom'
import { PlaySingle } from './pages/PlaySingle'
import { Theme } from './components/Theme'

export const App: FC = () => {
	return (
		<Theme>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/wait/choose" exact>
					<MultiChoose />
				</Route>
				<Route path="/wait/:mode" exact>
					<WaitingRoom />
				</Route>
				<Route path="/join/:mode/:uuid" exact>
					<Join />
				</Route>
				<Route path="/play/choose" exact>
					<SingleChoose />
				</Route>
				<Route path="/play/single/:mode" exact>
					<PlaySingle />
				</Route>
				<Route path="/play/:mode/:uuid" exact>
					<Play />
				</Route>
			</Switch>
		</Theme>
	)
}
