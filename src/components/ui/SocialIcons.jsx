/**
 * Brand marks as inline SVG.
 *
 * lucide-react v1 removed third-party logos, so these are hand-rolled. They
 * take the same props as a Lucide icon (className, etc.) and inherit colour
 * via `fill="currentColor"`.
 */

export function Facebook(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 8.5V7c0-.83.67-1 1.5-1H17V3h-2.5A4 4 0 0 0 10.5 7v1.5H8V12h2.5v9H14v-9h2.6l.4-3.5H14Z" />
    </svg>
  );
}

export function Instagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.4-2.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Youtube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M21.6 7.2a2.6 2.6 0 0 0-1.83-1.84C18.15 4.9 12 4.9 12 4.9s-6.15 0-7.77.46A2.6 2.6 0 0 0 2.4 7.2 27.2 27.2 0 0 0 2 12a27.2 27.2 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.83 1.84c1.62.46 7.77.46 7.77.46s6.15 0 7.77-.46a2.6 2.6 0 0 0 1.83-1.84A27.2 27.2 0 0 0 22 12a27.2 27.2 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default { Facebook, Instagram, Youtube };
