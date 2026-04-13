import styles from "./PostCover.module.css";

interface PostCoverProps {
  slug: string;
  title: string;
  className?: string;
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export default function PostCover({ slug, title, className = "" }: PostCoverProps) {
  const h = hashCode(slug);
  const hue1 = h % 360;
  const hue2 = (hue1 + 40 + (h % 60)) % 360;
  const angle = (h % 6) * 60;
  const shapes = (h % 4) + 3;

  return (
    <div className={`${styles.cover} ${className}`}>
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base gradient */}
        <defs>
          <linearGradient id={`g-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform={`rotate(${angle})`}>
            <stop offset="0%" stopColor={`hsl(${hue1}, 50%, 15%)`} />
            <stop offset="100%" stopColor={`hsl(${hue2}, 40%, 10%)`} />
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill={`url(#g-${slug})`} />

        {/* Dot grid */}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={`d${i}`}
            cx={32 + (i % 4) * 110 + ((h >> (i % 8)) % 20)}
            cy={40 + Math.floor(i / 4) * 60 + ((h >> (i % 5)) % 30)}
            r={2 + ((h >> i) % 3)}
            fill={`hsl(${hue1}, 60%, 50%)`}
            opacity={0.08 + ((h >> i) % 10) * 0.015}
          />
        ))}

        {/* Geometric shapes */}
        {Array.from({ length: shapes }).map((_, i) => {
          const x = 30 + ((h >> (i * 3)) % 340);
          const y = 20 + ((h >> (i * 2 + 1)) % 160);
          const size = 16 + ((h >> (i + 4)) % 40);
          const op = 0.06 + ((h >> (i + 2)) % 8) * 0.01;
          const shape = (h >> (i + 1)) % 3;

          if (shape === 0) {
            return (
              <circle
                key={`s${i}`}
                cx={x}
                cy={y}
                r={size / 2}
                stroke={`hsl(${hue1}, 55%, 55%)`}
                strokeWidth="1"
                opacity={op}
              />
            );
          }
          if (shape === 1) {
            return (
              <rect
                key={`s${i}`}
                x={x - size / 2}
                y={y - size / 2}
                width={size}
                height={size}
                stroke={`hsl(${hue2}, 50%, 50%)`}
                strokeWidth="1"
                opacity={op}
                transform={`rotate(${(h >> i) % 45}, ${x}, ${y})`}
              />
            );
          }
          return (
            <line
              key={`s${i}`}
              x1={x}
              y1={y}
              x2={x + size}
              y2={y - size * 0.5}
              stroke={`hsl(${hue1}, 45%, 50%)`}
              strokeWidth="1"
              opacity={op}
            />
          );
        })}

        {/* Title initial — large background letter */}
        <text
          x="350"
          y="170"
          textAnchor="end"
          fill={`hsl(${hue1}, 50%, 45%)`}
          fontFamily="var(--font-display)"
          fontSize="100"
          fontWeight="800"
          opacity="0.06"
        >
          {title.charAt(0).toUpperCase()}
        </text>

        {/* Accent line */}
        <line
          x1="24"
          y1="180"
          x2={80 + (h % 80)}
          y2="180"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
