import React, { ElementType, FC } from 'react'

interface GridProps {
	as?: ElementType<any>
	className?: string
	columns?: string | number
	gap?: string | number
	height?: string | number
	padding?: string | number
	rows?: string | number
	[key: string]: any
}

export const Grid: FC<GridProps> = ({
	as = 'div',
	children,
	className,
	columns,
	gap,
	height,
	padding,
	rows,
	...props
}) => {
	const AsComponent = as

	return (
		<>
			<style jsx>{`
				.grid {
					display: grid;
					min-height: 0;
					grid-gap: ${getStyleMeasurement(gap)};
					grid-template-columns: ${getRepeatableDefault(columns)};
					height: ${getStyleMeasurement(height, '%')};
					padding: ${getStyleMeasurement(padding)};
					grid-template-rows: ${getRepeatableDefault(rows)};
				}
			`}</style>
			<AsComponent {...props} className={`grid ${className}`}>
				{children}
			</AsComponent>
		</>
	)
}

function getStyleMeasurement(
	value?: string | number,
	unit: string = 'rem',
	mutliplier: number = 1.5,
): string | undefined {
	if (!value) {
		return
	}
	if (typeof value === 'number') {
		return `${value * mutliplier}${unit}`
	}
	return value
}

function getRepeatableDefault(value?: string | number): string {
	if (!value) {
		return 'auto'
	}

	if (typeof value === 'number') {
		return `repeat(${value}, 1fr)`
	}
	return value
}

interface CellProps {
	as?: ElementType<any>
	className?: string
	column?: string | number
	height?: string | number
	padding?: string | number
	row?: string | number
	textAlign?: string
	[key: string]: any
}

export const Cell: FC<CellProps> = ({
	as = 'div',
	children,
	className,
	column,
	height,
	padding,
	row,
	textAlign,
	...props
}) => {
	const AsComponent = as

	return (
		<>
			<style jsx>{`
				.cell {
					grid-column: ${column};
					height: ${getStyleMeasurement(height, '%')};
					padding: ${getStyleMeasurement(padding)};
					grid-row: ${row};
					text-align: ${textAlign};
				}
			`}</style>
			<AsComponent {...props} className={`cell ${className}`}>
				{children}
			</AsComponent>
		</>
	)
}
