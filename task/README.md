**Дано**
1. Таблица с компаниями с пагинацией и сортировкой по каждой колонке.
2. API-server, запускаемый по `yarn server` 

**API:**

1. GET /api/companies/ - получить все компании
2. GET /api/companies/:id - получить компанию
3. PATCH /api/companies/:id
{
“structure”: 2
}
-изменить структуру компании

**Реализовано:**

1. Добавлены фильтры для каждой колонки в таблице, для поля "Дата создания" добавлен фильтр с диапазоном дат.
3. В “Название компании“ находится ссылка на view компании.
4. В view компании добавлена возможность изменять структуру компании - ИП или ООО.