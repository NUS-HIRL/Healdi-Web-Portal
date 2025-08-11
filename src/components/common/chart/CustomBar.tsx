interface CustomBarProps<T = any> {
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

export const CustomBar = <T,>({
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
  ...otherProps
}: CustomBarProps<T>) => {
  // Filter out non-DOM props that shouldn't be passed to rect elements
  const {
    tooltipPosition,
    tooltipData,
    tooltipActive,
    index,
    animationBegin,
    animationDuration,
    animationEasing,
    isAnimationActive,
    dataKey,
    label,
    labelList,
    name,
    legendType,
    xAxisId,
    yAxisId,
    stackId,
    layout,
    barSize,
    maxBarSize,
    minPointSize,
    shape,
    ...rectProps
  } = otherProps;

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
        {...rectProps}
      />
    </g>
  )
}
