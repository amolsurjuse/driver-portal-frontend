type BrandLogoProps = {
  variant?: 'dark' | 'light';
  size?: 'header' | 'hero';
  className?: string;
};

export function BrandLogo({ variant = 'dark', size = 'header', className = '' }: BrandLogoProps) {
  const source = variant === 'light' ? '/electra-hub-logo-light.svg' : '/electra-hub-logo-dark.svg';
  const classes = ['brand-logo', `brand-logo--${size}`, className].filter(Boolean).join(' ');

  return <img className={classes} src={source} alt="Electra Hub" />;
}
