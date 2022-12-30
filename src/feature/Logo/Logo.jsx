import React from 'react';

import { Link } from '@/feature/Link';
import { Logo as SvgLogo } from '@/svgComponents';

// Styles
import classnames from 'classnames/bind';
import styles from './Logo.module.scss';

const cn = classnames.bind(styles);

export function Logo({ className, title, isMenuOpen, logoRef, isFooter=false, ...props}) {
  const label = title || 'Home';

  const image = <SvgLogo className={cn(isFooter ? 'footer-logo__icon' : 'logo__icon')} />;
  return (
    <Link ref={logoRef} href="/" target="_self" className={cn(isFooter ? 'footer-logo' : 'logo', { 'logo_menu-open': isMenuOpen }, className)} {...props}>
      {image}
      {label}
    </Link>
  );
}
