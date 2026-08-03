# Руководство для Claude Code (Payfair)

## Идентификация проекта
- **Проект:** Payfair
- **Стек:** Next.js (App Router), TypeScript, Tailwind CSS
- **Локализация:** pl, en, uk, ru (4 языка)

## СТРОГИЕ ПРАВИЛА (Экономия токенов)
1. **Запрещено сканировать:** `node_modules`, `.next`, `.git`, `public/images`.
2. **Запрещено выполнять:** `npm run build`, `npm run typecheck`, линтеры.
3. **Точечная работа:** Редактировать или создавать файлы только по явной команде.
4. **Формат ответа:** После выполнения задачи пишешь только: `"Готово. Остановился."`

## Структура данных
- Готовые тексты для страниц лежат в папке `data/`:
  - `data/content.pl.json`
  - `data/content.en.json`
  - `data/content.uk.json`
  - `data/content.ru.json`

## Анимация и адаптивность
1. Обязательно установи библиотеку: `npm install framer-motion`.
2. Все заголовки и контентные блоки оборачивай в `<motion.div>` с эффектом появления: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}`.
3. Для мобильных экранов проверяй Tailwind-классы `md:`, `sm:`, `lg:`, `flex-col`, `gap-4`, чтобы верстка не ломалась.

## Алгоритм действий Клода
1. Создай глобальные компоненты `Header.tsx` и `Footer.tsx` в `src/components/` на основе `siteConfig` из любого JSON.
2. Создай структуру папок в `public/images/` согласно `images.folders` из JSON. В каждую папку положи `.gitkeep`.
   - **ВАЖНО:** Для папки `public/images/og/` создай заглушку `og-default.webp` (можно использовать прозрачный 1x1 пиксель или просто оставить `.gitkeep`).
3. Сгенерируй SVG-иконки для папки `public/images/icons/`:
   - Создай файлы `phone.svg`, `mail.svg`, `location.svg`, `clock.svg` с чистым SVG-кодом и залей их в эту папку.
4. Для каждого языка (`pl`, `en`, `uk`, `ru`) создай страницы в `src/app/[locale]/`.
   - Путь `home` создавай как `src/app/[locale]/page.tsx`.
   - Остальные пути (`services`, `about`, `prices`, `blog`, `contacts`, `privacy`, `faq`) создавай как отдельные папки с `page.tsx`.
5. В каждый `page.tsx` вставь `export const metadata` и JSX-контент из соответствующего JSON-файла. Контент обязательно оборачивай в `<Header />` и `<Footer />`.

## Важно
1. Все внутренние ссылки (`<a href="...">`) оставляй как есть в JSON, они уже переведены на нужные языки.
2. В файлах `.tsx` используй `"use client"`, если есть хуки или анимации.