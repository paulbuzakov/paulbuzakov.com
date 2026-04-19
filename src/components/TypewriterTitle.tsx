import { useEffect, useRef, useState } from "react";
import styles from "./TypewriterTitle.module.css";

type Props = {
  readonly firstName: string;
  readonly lastName: string;
  readonly className?: string;
  readonly accentClassName?: string;
  readonly silentFallbackMs?: number;
};

const prefersReducedMotion = () =>
  typeof globalThis.matchMedia === "function" &&
  globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function TypewriterTitle({
  firstName,
  lastName,
  className,
  accentClassName,
  silentFallbackMs = 2500,
}: Props) {
  const total = firstName.length + lastName.length;
  const [reduce] = useState(prefersReducedMotion);
  const [count, setCount] = useState(() =>
    prefersReducedMotion() ? total : 0,
  );
  const [started, setStarted] = useState(() => prefersReducedMotion());
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (reduce) return;

    const onGesture = () => {
      if (!audioRef.current) {
        try {
          const Ctx =
            globalThis.AudioContext ||
            (
              globalThis as unknown as {
                webkitAudioContext: typeof AudioContext;
              }
            ).webkitAudioContext;
          audioRef.current = new Ctx();
        } catch {
          audioRef.current = null;
        }
      }
      void audioRef.current?.resume();
      setStarted(true);
    };

    globalThis.addEventListener("pointerdown", onGesture, { once: true });
    globalThis.addEventListener("keydown", onGesture, { once: true });
    const fallback = setTimeout(() => setStarted(true), silentFallbackMs);

    return () => {
      clearTimeout(fallback);
      globalThis.removeEventListener("pointerdown", onGesture);
      globalThis.removeEventListener("keydown", onGesture);
      void audioRef.current?.close();
      audioRef.current = null;
    };
  }, [reduce, silentFallbackMs]);

  useEffect(() => {
    if (!started || count >= total) return;
    const delay = 85 + Math.random() * 95;
    const timer = setTimeout(() => {
      playKeyClick(audioRef.current);
      setCount((c) => c + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, count, total]);

  const firstShown = Math.min(count, firstName.length);
  const lastShown = Math.max(0, count - firstName.length);
  const onFirstLine = count < firstName.length;
  const done = count >= total;

  return (
    <h1 className={className}>
      <span className={styles.line}>
        {firstName.slice(0, firstShown)}
        {onFirstLine && <span className={styles.cursor} aria-hidden="true" />}
        <span className={styles.ghost} aria-hidden="true">
          {firstName.slice(firstShown)}
        </span>
      </span>
      <br />
      <span className={accentClassName}>
        {lastName.slice(0, lastShown)}
        {!onFirstLine && (
          <span
            className={styles.cursor}
            data-done={done ? "true" : undefined}
            aria-hidden="true"
          />
        )}
        <span className={styles.ghost} aria-hidden="true">
          {lastName.slice(lastShown)}
        </span>
      </span>
      <span className={styles.sr}>
        {firstName} {lastName}
      </span>
    </h1>
  );
}

function playKeyClick(ctx: AudioContext | null) {
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
    return;
  }
  if (ctx.state !== "running") return;

  const now = ctx.currentTime;
  const duration = 0.05;

  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const decay = Math.pow(1 - i / bufferSize, 2.2);
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1400 + Math.random() * 700;
  filter.Q.value = 1.6;

  const gain = ctx.createGain();
  const peak = 0.22 + Math.random() * 0.08;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  src.start(now);
  src.stop(now + duration + 0.02);
}
