'use client'
interface BarcodeProps {
  code: string; width?: number; height?: number
  className?: string; showCode?: boolean; color?: string
}

export default function Barcode({ code, width = 140, height = 52, className = '', showCode = true, color = '#1A1A1A' }: BarcodeProps) {
  const seed = code.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const bars: { x: number; w: number; h: number }[] = []
  let x = 0
  for (let i = 0; i < 42; i++) {
    const w = (seed * (i + 1) * 7) % 3 + 1
    const h = height - (i % 5 === 0 ? 0 : 8)
    if (i % 3 !== 2 && x + w < width - 8) { bars.push({ x: x + 4, w, h }) }
    x += w + 1
  }
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {bars.map((b, i) => <rect key={i} x={b.x} y={height - b.h} width={b.w} height={b.h} fill={color} />)}
      </svg>
      {showCode && <span style={{ fontSize: 9, color, fontFamily: 'monospace', letterSpacing: '0.15em' }}>{code}</span>}
    </div>
  )
}
