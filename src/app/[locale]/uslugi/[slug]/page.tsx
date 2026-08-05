import { getContent } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const locales = ['pl'];
  const slugsMap: Record<string, string[]> = {
    pl: ['prawo-karne', 'prawo-cywilne', 'prawo-rodzinne', 'prawo-gospodarcze', 'prawo-administracyjne', 'etpcz'],
  };
  const params = [];
  for (const locale of locales) {
    for (const slug of slugsMap[locale]) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default function ServicePage({ params }: { params: { locale: string; slug: string } }) {
  const content = getContent(params.locale);
  // Предположим, что в JSON есть поле slug для каждой услуги (пока нет – можно искать по совпадению)
  // Для простоты просто показываем заглушку, но чтобы не было 404 – возвращаем страницу.
  // Если нужно найти конкретную услугу – добавь в JSON поле slug и используй его.
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1>Услуга: {params.slug}</h1>
      <p>Страница в разработке. Здесь будет детальное описание услуги.</p>
    </div>
  );
}