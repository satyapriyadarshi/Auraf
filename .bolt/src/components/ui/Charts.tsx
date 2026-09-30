import type { DemandDataPoint } from '@/types';

interface DemandChartProps {
  data: DemandDataPoint[];
  height?: number;
}

export function DemandChart({ data, height = 180 }: DemandChartProps) {
  const maxDemand = Math.max(...data.map((d) => d.demand));
  const minDemand = Math.min(...data.map((d) => d.demand));
  const range = maxDemand - minDemand || 1;

  const chartWidth = 320;
  const chartHeight = height;
  const padding = { top: 20, right: 10, bottom: 30, left: 40 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * innerWidth,
    y: padding.top + innerHeight - ((d.demand - minDemand) / range) * innerHeight,
    ...d,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ minWidth: 280 }}>
        <defs>
          <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padding.left}
            y1={padding.top + innerHeight * t}
            x2={padding.left + innerWidth}
            y2={padding.top + innerHeight * t}
            stroke="#f3f4f6"
            strokeWidth={1}
          />
        ))}

        <path d={areaD} fill="url(#demandGradient)" />
        <path d={pathD} fill="none" stroke="#16a34a" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4} fill="#16a34a" stroke="white" strokeWidth={2} />
            <text x={p.x} y={chartHeight - 10} textAnchor="middle" className="fill-gray-400" style={{ fontSize: 10 }}>
              {p.day}
            </text>
          </g>
        ))}

        <text x={padding.left} y={padding.top - 6} className="fill-gray-400" style={{ fontSize: 10 }}>
          {maxDemand.toLocaleString()} kg
        </text>
        <text x={padding.left} y={padding.top + innerHeight + 4} className="fill-gray-400" style={{ fontSize: 10 }}>
          {minDemand.toLocaleString()} kg
        </text>
      </svg>
    </div>
  );
}

interface PriceChartProps {
  data: DemandDataPoint[];
  height?: number;
}

export function PriceChart({ data, height = 160 }: PriceChartProps) {
  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const range = maxPrice - minPrice || 1;

  const chartWidth = 320;
  const chartHeight = height;
  const padding = { top: 20, right: 10, bottom: 30, left: 40 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const barWidth = innerWidth / data.length - 6;

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" style={{ minWidth: 280 }}>
        {data.map((d, i) => {
          const barHeight = ((d.price - minPrice) / range) * innerHeight;
          const x = padding.left + (i / data.length) * innerWidth + 3;
          const y = padding.top + innerHeight - barHeight;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill="#4ade80"
                opacity={0.85}
              />
              <text x={x + barWidth / 2} y={chartHeight - 10} textAnchor="middle" className="fill-gray-400" style={{ fontSize: 10 }}>
                {d.day}
              </text>
            </g>
          );
        })}

        <text x={padding.left} y={padding.top - 6} className="fill-gray-400" style={{ fontSize: 10 }}>
          ₹{maxPrice}
        </text>
        <text x={padding.left} y={padding.top + innerHeight + 4} className="fill-gray-400" style={{ fontSize: 10 }}>
          ₹{minPrice}
        </text>
      </svg>
    </div>
  );
}
