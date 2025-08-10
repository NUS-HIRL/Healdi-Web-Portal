interface CustomDotProps {
  cx?: number
  cy?: number
  payload?: {
    systolic: number
    diastolic: number
    highlighted?: boolean
  }
  onMouseEnter?: (payload: unknown) => void
  onMouseLeave?: () => void
  hoverZoneWidth?: number
  hoverZoneHeight?: number
  dotColor?: string
  lineColorNormal?: string
  lineColorHighlighted?: string
  lineWidthNormal?: number
  lineWidthHighlighted?: number
  dotRadius?: number
}

export const CustomDot = ({
  cx,
  cy,
  payload,
  onMouseEnter,
  onMouseLeave,
  hoverZoneWidth = 40,
  hoverZoneHeight = 240,
  dotColor = '#ec4899',
  lineColorNormal = '#f9a8d4',
  lineColorHighlighted = '#374151',
  lineWidthNormal = 2,
  lineWidthHighlighted = 3,
  dotRadius = 4,
}: CustomDotProps) => {
  if (!payload || cx === undefined || cy === undefined) return null
  
  const rangeHeight = ((payload.systolic - payload.diastolic) / 300) * hoverZoneHeight // Approximate height scaling
  const lineColor = payload.highlighted ? lineColorHighlighted : lineColorNormal
  const lineWidth = payload.highlighted ? lineWidthHighlighted : lineWidthNormal
  
  return (
    <g>
      {/* Invisible hover zone - extends full chart height for easier hovering */}
      <rect
        x={cx - hoverZoneWidth / 2}
        y={0}
        width={hoverZoneWidth}
        height={hoverZoneHeight}
        fill="transparent"
        onMouseEnter={() => onMouseEnter?.(payload)}
        onMouseLeave={onMouseLeave}
        style={{ cursor: 'pointer' }}
      />
      {/* Vertical range line */}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy + rangeHeight}
        stroke={lineColor}
        strokeWidth={lineWidth}
        strokeLinecap="round"
      />
      {/* High point (systolic) */}
      <circle
        cx={cx}
        cy={cy}
        r={dotRadius}
        fill={dotColor}
        stroke="white"
        strokeWidth={1}
      />
      {/* Low point (diastolic) */}
      <circle
        cx={cx}
        cy={cy + rangeHeight}
        r={dotRadius}
        fill={dotColor}
        stroke="white"
        strokeWidth={1}
      />
    </g>
  )
}
