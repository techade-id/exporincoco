import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function IconShip(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 17l2.2-7h13.6L21 17" />
      <path d="M4 17c1.2 1.6 3.4 2.5 8 2.5s6.8-.9 8-2.5" />
      <path d="M8 10V7h3v3M13 10V6h3v4" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3l8 3v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V6l8-3z" />
      <path d="M8.5 12.2l2.3 2.3 4.7-5" />
    </svg>
  );
}

export function IconTruck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h4l3 3v2h-7" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="18" cy="17.5" r="1.5" />
    </svg>
  );
}

export function IconTag(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M3 12l9-9h6v6l-9 9-6-6z" />
      <circle cx="16" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 19c8-1 13-8 14-15-7 1-14 6-14 15z" />
      <path d="M8 12c2 2 4 4 7 5" />
    </svg>
  );
}

export function IconHeadset(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 13a8 8 0 0116 0" />
      <path d="M4 13v5a2 2 0 002 2h1v-7H6a2 2 0 00-2 2zM18 13v7h1a2 2 0 002-2v-5h-1a2 2 0 00-2 0z" />
    </svg>
  );
}

export function IconPdf(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M9 15h6M9 11h6" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 6 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-6-3.8-9S9.5 5.8 12 3z" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.2A9.8 9.8 0 002.8 17.4L2 22l4.7-.8A9.8 9.8 0 1012 2.2zm5.7 14c-.2.7-1.2 1.2-1.9 1.3-.5.1-1.1.2-3.6-.8-3.1-1.2-5.1-4.3-5.3-4.5-.2-.2-1.5-2-1.5-3.8s1-2.7 1.3-3.1c.3-.4.7-.5 1-.5h.7c.2 0 .5 0 .7.6.3.7.9 2.4 1 2.6.1.2.1.4 0 .6-.1.3-.2.4-.4.7l-.5.6c-.2.2-.3.4-.1.7.2.4.9 1.5 2 2.4 1.3 1.1 2.4 1.5 2.8 1.6.3.1.6.1.8-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.9.9 2.2 1.1.3.2.5.2.6.4.1.1.1.7-.1 1.4z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function IconQuote(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M10 7H5.5A3.5 3.5 0 002 10.5V17h6v-6H5.2c0-1.3.9-2.4 2.8-2.6V7zm12 0h-4.5A3.5 3.5 0 0014 10.5V17h6v-6h-2.8c0-1.3.9-2.4 2.8-2.6V7z" />
    </svg>
  );
}
