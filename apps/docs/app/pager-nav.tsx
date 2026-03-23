import Link from 'next/link';

export interface PagerLink {
  href: string;
  label: string;
}

export function PagerNav({
  previous,
  next
}: {
  previous: PagerLink | null;
  next: PagerLink | null;
}) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="pager-nav" aria-label="Page navigation">
      {previous ? (
        <Link
          href={previous.href}
          className="pager-nav__link pager-nav__link--previous"
          aria-label={`Previous: ${previous.label}`}
        >
          <span className="pager-nav__meta">Previous</span>
          <strong>{previous.label}</strong>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={next.href}
          className="pager-nav__link pager-nav__link--next"
          aria-label={`Next: ${next.label}`}
        >
          <span className="pager-nav__meta">Next</span>
          <strong>{next.label}</strong>
        </Link>
      ) : null}
    </nav>
  );
}
