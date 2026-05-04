
-- Создаём функцию-генератор данных
CREATE OR REPLACE FUNCTION generate_test_data(
	num_users INTEGER DEFAULT 50,
	num_categories INTEGER DEFAULT 10,
	num_products INTEGER DEFAULT 100,
	num_reviews INTEGER DEFAULT 200
)
RETURNS TEXT AS $$

import random
from datetime import datetime, timedelta

# Генерация данных для categories
categories_data = [
	('Смартфоны',), ('Ноутбуки',), ('Планшеты',), ('Наушники',),
	('Клавиатуры',), ('Мыши',), ('Мониторы',), ('Комплектующие',),
	('Аксессуары',), ('Смарт-часы',), ('Фототехника',), ('Аудиотехника',),
	('Сетевое оборудование',), ('Программное обеспечение',), ('Игровые консоли',)
]

# Имена для генерации пользователей
first_names = ['Алексей', 'Дмитрий', 'Максим', 'Анна', 'Елена', 'Мария', 
			   'Иван', 'Сергей', 'Ольга', 'Татьяна', 'Андрей', 'Наталья']
last_names = ['Иванов', 'Петров', 'Сидоров', 'Кузнецова', 'Смирнова', 
			  'Волков', 'Морозов', 'Новикова', 'Козлов', 'Лебедев']

domains = ['gmail.com', 'yandex.ru', 'mail.ru', 'bk.ru', 'inbox.ru']

# Статусы доступности
statuses = ['in stock', 'out of stock', 'preorder']

# Шаблоны для отзывов
review_templates = [
	"Отличный продукт! Рекомендую.",
	"Нормально, но есть нюансы.",
	"Не соответствует ожиданиям.",
	"Лучшее в своём классе!",
	"Цена завышена, но качество хорошее.",
	"Быстрая доставка, товар как на фото.",
	"Пользуюсь уже месяц, всё отлично.",
	"Брак попался, пришлось вернуть.",
	"Хорошее соотношение цена-качество.",
	"Продавец отличный, товар супер!"
]

def generate_email(first_name, last_name):
	email = f"{first_name.lower()}.{last_name.lower()}@{random.choice(domains)}"
	return email.replace(' ', '')

def generate_date(start_date, end_date):
	time_between = end_date - start_date
	days_between = time_between.days
	random_days = random.randrange(days_between)
	return start_date + timedelta(days=random_days)

# Очищаем существующие данные (опционально)
plpy.execute("TRUNCATE TABLE categories, users, products, product_reviews RESTART IDENTITY CASCADE;")

# 1. Заполняем categories
actual_categories = min(num_categories, len(categories_data))
plan = plpy.prepare("INSERT INTO categories (name) VALUES ($1)", ['varchar'])
for i in range(actual_categories):
	plpy.execute(
		plan,[categories_data[i][0]]
	)
plpy.info(f"✓ Добавлено {actual_categories} категорий")

# Получаем ID категорий
categories_ids = [row['id'] for row in plpy.execute("SELECT id FROM categories ORDER BY id")]

# 2. Заполняем users
start_date = datetime.now().date() - timedelta(days=365)
end_date = datetime.now().date()

plan = plpy.prepare(
	"INSERT INTO users (full_name, email, avatar_url, created_at) VALUES ($1, $2, $3, $4)",
	['varchar', 'varchar', 'varchar', 'date']
)
for i in range(num_users):
	first_name = random.choice(first_names)
	last_name = random.choice(last_names)
	full_name = f"{first_name} {last_name}"
	email = generate_email(first_name, last_name)
	avatar_url = f"https://randomuser.me/api/portraits/{random.choice(['men', 'women'])}/{random.randint(1, 99)}.jpg"
	created_at = generate_date(start_date, end_date)
	
	plpy.execute(plan, [full_name, email, avatar_url, created_at])
	
	if (i + 1) % 10 == 0:
		plpy.info(f"✓ Добавлено {i + 1} пользователей")

# Получаем ID пользователей
users_ids = [row['id'] for row in plpy.execute("SELECT id FROM users ORDER BY id")]

# 3. Заполняем products
product_names = [
	"iPhone", "Samsung Galaxy", "Xiaomi", "MacBook", "Dell XPS",
	"Lenovo ThinkPad", "iPad", "Sony WH-1000", "AirPods", "Logitech MX",
	"Razer", "ASUS ROG", "Acer Predator", "Microsoft Surface", "Google Pixel"
]

plan = plpy.prepare(
	"""INSERT INTO products (name, description, price, category_id, image_url, availability_status) 
	   VALUES ($1, $2, $3, $4, $5)""",
	   ['varchar', 'text', 'integer', 'integer', 'text', 'varchar']
)
for i in range(num_products):
	name = f"{random.choice(product_names)} {random.randint(1, 100)}"
	description = f"Современное устройство для работы и развлечений. Модель {name} имеет отличные характеристики и стильный дизайн."
	category_id = random.choice(categories_ids)
	price = random.randint(20000, 120000)
	image_url = f"https://picsum.photos/id/{random.randint(1, 200)}/200/200"
	availability_status = random.choice(statuses)
	
	plpy.execute(plan, [name, description, price, category_id, image_url, availability_status])
	
	if (i + 1) % 20 == 0:
		plpy.info(f"✓ Добавлено {i + 1} товаров")

# Получаем ID товаров
products_ids = [row['id'] for row in plpy.execute("SELECT id FROM products ORDER BY id")]

# 4. Заполняем product_reviews
start_date_reviews = datetime.now().date() - timedelta(days=180)
end_date_reviews = datetime.now().date()

plan = plpy.prepare(
	"INSERT INTO product_reviews (user_id, product_id, review, created_at) VALUES ($1, $2, $3, $4)",
	['integer', 'integer', 'text', 'date']
)
for i in range(num_reviews):
	user_id = random.choice(users_ids)
	product_id = random.choice(products_ids)
	review = random.choice(review_templates)
	created_at = generate_date(start_date_reviews, end_date_reviews)
	
	try:
		plpy.execute(plan, [user_id, product_id, review, created_at])
	except Exception as e:
		plpy.warning(f"Не удалось добавить отзыв для product_id={product_id}, user_id={user_id}: {str(e)}")
	
	if (i + 1) % 50 == 0:
		plpy.info(f"✓ Добавлено {i + 1} отзывов")

# Статистика
stats_query = """
SELECT 
	(SELECT COUNT(*) FROM categories) as categories_count,
	(SELECT COUNT(*) FROM users) as users_count,
	(SELECT COUNT(*) FROM products) as products_count,
	(SELECT COUNT(*) FROM product_reviews) as reviews_count
"""

result = plpy.execute(stats_query)[0]

return f"""
Генерация данных завершена!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Статистика:
   • Категорий: {result['categories_count']}
   • Пользователей: {result['users_count']}
   • Товаров: {result['products_count']}
   • Отзывов: {result['reviews_count']}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""

$$ LANGUAGE plpython3u;

-- Примеры использования:

-- Сгенерировать тестовые данные с параметрами по умолчанию
SELECT generate_test_data();

-- Сгенерировать с пользовательскими параметрами
SELECT generate_test_data(
	num_users := 30,      -- 30 пользователей
	num_categories := 8,  -- 8 категорий
	num_products := 50,   -- 50 товаров
	num_reviews := 100    -- 100 отзывов
);

-- Проверить результат
SELECT * FROM categories LIMIT 5;
SELECT * FROM users LIMIT 5;
SELECT * FROM products LIMIT 5;
SELECT * FROM product_reviews LIMIT 5;