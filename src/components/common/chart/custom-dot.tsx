interface CustomDotProps<T = Record<string, unknown>> {
  cx?: number
  cy?: number
  payload?: T
  onMouseEnter?: (payload: T) => void
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

export function CustomDot<T = Record<string, unknown>>({
  cx,
  cy,
  payload,
  onMouseEnter,
  onMouseLeave,
  hoverZoneWidth = 40,
  hoverZoneHeight = 240,
  dotColor = "#ec4899",
  lineColorNormal = "#f9a8d4",
  lineColorHighlighted = "#374151",
  lineWidthNormal = 2,
  lineWidthHighlighted = 3,
  dotRadius = 4
}: CustomDotProps<T>) {
  if (!payload || cx === undefined || cy === undefined) return null

  // Type guard to check if payload has blood pressure properties
  const isBloodPressurePayload = (
    payload: T
  ): payload is T & {
    systolic: number
    diastolic: number
    highlighted?: boolean
  } => {
    return (
      payload &&
      typeof (payload as Record<string, unknown>).systolic === "number" &&
      typeof (payload as Record<string, unknown>).diastolic === "number"
    )
  }

  // Calculate range height only for blood pressure data
  const rangeHeight = isBloodPressurePayload(payload)
    ? ((payload.systolic - payload.diastolic) / 300) * hoverZoneHeight
    : 0

  const lineColor =
    isBloodPressurePayload(payload) && payload.highlighted
      ? lineColorHighlighted
      : lineColorNormal

  const lineWidth =
    isBloodPressurePayload(payload) && payload.highlighted
      ? lineWidthHighlighted
      : lineWidthNormal

  return (
    <g>
      {/* Invisible hover zone - extends full chart height for easier hovering */}
      <rect
        x={cx - hoverZoneWidth / 2}
        y={0}
        width={hoverZoneWidth}
        height={hoverZoneHeight}
        fill="transparent"
        onMouseEnter={() => payload && onMouseEnter?.(payload)}
        onMouseLeave={onMouseLeave}
        style={{ cursor: "pointer" }}
      />
      {/* Conditional rendering for blood pressure data */}
      {isBloodPressurePayload(payload) && (
        <>
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
        </>
      )}
      {/* Default dot for non-blood pressure data */}
      {!isBloodPressurePayload(payload) && (
        <circle
          cx={cx}
          cy={cy}
          r={dotRadius}
          fill={dotColor}
          stroke="white"
          strokeWidth={1}
        />
      )}
    </g>
  )
}
