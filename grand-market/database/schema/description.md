[user]
-> id (Primary Key, bigint(20))
-> last_name (varchar(100))
-> first_name (varchar(100))
-> email (Foreign Key, varchar(255))
-> email_verified_at (timestamp)
-> password (varchar(255))
-> remember_token (varchar(255))
-> is_admin (boolean(false))
-> created_at (timestamp)
-> updated_at (timestamp)

[product]
-> id (Primary Key, bigint(20))
-> name (varchar(255))
-> description (text(1000))
-> price (decimal(255))
-> stock (int(1000))
-> created_at (timestamp)
-> updated_at (timestamp)

[category]
-> id (Primary Key, bigint(20))
-> name (varchar(255))

[product_category]
-> product_id (Primary Key, Foreign Key, bigint(20))
-> category_id (Foreign Key, bigint(20))

[order]
-> id (Primary Key, bigint(20))
-> user_id (Foreign Key, bigint(20))
-> total_price (decimal(255))
-> postal_code (int(100))
-> city (varchar(255))
-> address (varchar(255))
-> phone_number (varchar(255))
-> description (varchar(255))
-> created_at (timestamp)

[product_order]
-> order_id (Primary Key, Foreign Key, bigint(20))
-> product_id (Foreign Key, bigint(20))