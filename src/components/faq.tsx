type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <>
      <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {items.map((item) => (
          <details key={item.q} className="group p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
              <span className="h3">{item.q}</span>
              <span aria-hidden className="mt-1 shrink-0 text-nur transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}
