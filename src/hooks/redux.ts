import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

export function useActions<TActions>(actions: TActions, deps?: any[]): TActions {
	const dispatch = useDispatch()
	return useMemo(
		() => {
			if (Array.isArray(actions)) {
				return actions.map((a) => bindActionCreators(a, dispatch))
			}
			return bindActionCreators(actions as any, dispatch)
		},
		deps ? [dispatch, ...deps] : [dispatch],
	)
}
