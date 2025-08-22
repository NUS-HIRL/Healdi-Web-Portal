interface CustomBarProps<T = Record<string, unknown>> {
  payload?: T
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
  onMouseEnter?: (payload: T) => void
  onMouseLeave?: () => void
  hoverZoneHeight?: number
  borderRadius?: number
  [key: string]: unknown
}

export const CustomBar = <T = Record<string, unknown>,>({
  payload,
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill = '#000000',
  onMouseEnter,
  onMouseLeave,
  hoverZoneHeight = 400,
  borderRadius = 2,
}: CustomBarProps<T>) => {


  return (
    <g
      onMouseEnter={() => payload && onMouseEnter?.(payload)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* Invisible hover zone - extends full chart height */}
      <rect
        x={x}
        y={0}
        width={width}
        height={hoverZoneHeight}
        fill="transparent"
      />
      {/* Actual bar */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={borderRadius}
        ry={borderRadius}
      />
    </g>
  )
}
