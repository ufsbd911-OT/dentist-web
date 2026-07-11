interface AutoScrollTapeProps {
  items: string[];
  direction?: 'left' | 'right';
  tone?: 'blue' | 'yellow' | 'light';
  label?: string;
}

export function AutoScrollTape({
  items,
  direction = 'left',
  tone = 'blue',
  label = 'Informations en continu',
}: AutoScrollTapeProps) {
  const group = (hidden = false) => (
    <div className="auto-tape__group" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span className="auto-tape__item" key={`${item}-${index}`}>
          <span className="auto-tape__dot" aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`auto-tape auto-tape--${tone}`} role="region" aria-label={label}>
      <div className={`auto-tape__track ${direction === 'right' ? 'auto-tape__track--right' : ''}`}>
        {group()}
        {group(true)}
      </div>
    </div>
  );
}
