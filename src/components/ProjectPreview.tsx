import styles from "./ProjectPreview.module.css";

interface ProjectPreviewProps {
  readonly title: string;
  readonly tech: string[];
  readonly className?: string;
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.trunc((h << 5) - h + (s.codePointAt(i) || 0));
  }
  return Math.abs(h);
}

export default function ProjectPreview({
  title,
  tech,
  className = "",
}: ProjectPreviewProps) {
  const h = hashCode(title);
  const hue = (h % 40) + 70; // green-ish range to stay on brand

  return (
    <div className={`${styles.preview} ${className}`}>
      <svg
        viewBox="0 0 360 180"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="360" height="180" fill="var(--code-bg)" />

        {/* Browser chrome */}
        <rect width="360" height="24" fill="var(--bg-elevated)" />
        <circle cx="14" cy="12" r="4" fill="#ef4444" opacity="0.5" />
        <circle cx="28" cy="12" r="4" fill="#eab308" opacity="0.5" />
        <circle cx="42" cy="12" r="4" fill="#22c55e" opacity="0.5" />

        {/* URL bar */}
        <rect
          x="60"
          y="6"
          width="240"
          height="12"
          rx="3"
          fill="var(--bg-hover)"
        />
        <text
          x="72"
          y="15"
          fill="var(--text-muted)"
          fontFamily="var(--font-mono)"
          fontSize="7"
          opacity="0.5"
        >
          localhost:3000
        </text>

        {/* Fake UI elements */}
        {/* Sidebar */}
        <rect x="0" y="24" width="60" height="156" fill="var(--bg-raised)" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect
            key={`nav${i}`}
            x="10"
            y={36 + i * 22}
            width={20 + ((h >> i) % 20)}
            height="6"
            rx="2"
            fill="var(--border-hover)"
            opacity={i === h % 5 ? 0.9 : 0.35}
          />
        ))}
        {/* Active nav indicator */}
        <rect
          x="0"
          y={36 + (h % 5) * 22 - 2}
          width="2"
          height="10"
          fill="var(--accent)"
          opacity="0.8"
        />

        {/* Content area — fake cards */}
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={`card${i}`}>
            <rect
              x={72 + i * 96}
              y="36"
              width="84"
              height="48"
              rx="4"
              fill={`hsl(${hue + i * 15}, 30%, ${12 + i * 2}%)`}
              stroke="var(--border)"
              strokeWidth="0.5"
            />
            <rect
              x={80 + i * 96}
              y="52"
              width={40 + ((h >> (i + 3)) % 20)}
              height="4"
              rx="1"
              fill="var(--border-hover)"
            />
            <rect
              x={80 + i * 96}
              y="60"
              width={30 + ((h >> (i + 1)) % 15)}
              height="3"
              rx="1"
              fill="var(--border)"
            />
          </g>
        ))}

        {/* Chart/graph area */}
        <rect
          x="72"
          y="96"
          width="276"
          height="72"
          rx="4"
          fill="var(--bg-raised)"
          stroke="var(--border)"
          strokeWidth="0.5"
        />
        <polyline
          points={Array.from({ length: 10 })
            .map((_, i) => {
              const x = 84 + i * 28;
              const y = 150 - 10 - ((h >> (i + 2)) % 40);
              return `${x},${y}`;
            })
            .join(" ")}
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        {/* Grid lines */}
        {[112, 128, 144].map((y) => (
          <line
            key={y}
            x1="84"
            y1={y}
            x2="336"
            y2={y}
            stroke="var(--border)"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}

        {/* Tech label */}
        <text
          x="84"
          y="108"
          fill="var(--text-muted)"
          fontFamily="var(--font-mono)"
          fontSize="7"
          opacity="0.4"
        >
          {tech.slice(0, 2).join(" + ")}
        </text>
      </svg>
    </div>
  );
}
