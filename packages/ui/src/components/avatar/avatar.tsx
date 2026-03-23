import { ImgHTMLAttributes } from 'react';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'> {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

function getInitials(name?: string) {
  if (!name?.trim()) {
    return '?';
  }

  const parts = name.trim().split(/\s+/).slice(0, 2);

  return parts.map((part) => part.charAt(0).toUpperCase()).join('');
}

export function Avatar({ alt, className, name, size = 'md', src, ...props }: AvatarProps) {
  const classes = ['avenra-avatar', `avenra-avatar--${size}`, className].filter(Boolean).join(' ');

  if (src && alt) {
    return <img src={src} alt={alt} className={classes} {...props} />;
  }

  return (
    <span className={classes} aria-label={name ?? alt ?? 'Avatar'}>
      <span className="avenra-avatar__fallback">{getInitials(name)}</span>
    </span>
  );
}
