import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h2 mt-4">Такой страницы нет</h1>
      <p className="lede mt-4 max-w-md">
        Возможно, ссылка устарела. Посмотрите услуги или напишите нам — подскажем, где искать.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link className="btn-primary" href="/">
          На главную
        </Link>
        <Link className="btn-ghost" href="/services">
          К услугам
        </Link>
      </div>
    </div>
  );
}
