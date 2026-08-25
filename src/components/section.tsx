type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  /** На странице должен быть ровно один h1 — там, где заголовок секции и есть заголовок страницы. */
  titleAs?: 'h1' | 'h2';
  lede?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, titleAs = 'h2', lede, children, className = '' }: SectionProps) {
  const Heading = titleAs;
  return (
    <section id={id} className={`container-page py-16 sm:py-24 ${className}`}>
      {(eyebrow || title || lede) && (
        <header className="max-w-2xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {title && <Heading className={`${titleAs === 'h1' ? 'h1' : 'h2'} mt-3`}>{title}</Heading>}
          {lede && <p className="lede mt-4">{lede}</p>}
        </header>
      )}
      <div className={eyebrow || title || lede ? 'mt-10' : ''}>{children}</div>
    </section>
  );
}
