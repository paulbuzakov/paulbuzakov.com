import avatarSrc from "../assets/avatar.jpg";
import styles from "./Avatar.module.css";

interface AvatarProps {
  size?: number;
  className?: string;
}

export default function Avatar({ size = 120, className = "" }: AvatarProps) {
  return (
    <div
      className={`${styles.avatar} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={avatarSrc}
        alt="Paul Buzakov"
        width={size}
        height={size}
        className={styles.img}
      />
      {/* Shimmer highlight */}
      <div className={styles.shimmer} />
      {/* Edge ring */}
      <div className={styles.ring} />
    </div>
  );
}
