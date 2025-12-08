package com.sunset.ictstudy.data

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.AccountTree
import androidx.compose.material.icons.rounded.DataArray
import androidx.compose.material.icons.rounded.Filter
import androidx.compose.material.icons.rounded.JoinInner
import androidx.compose.material.icons.rounded.Lock
import androidx.compose.material.icons.rounded.TableChart
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector

/** Data model for SQL database topics. */
data class SQLTopic(
    val id: String,
    val title: String,
    val description: String,
    val progressPercent: Int,
    val isCompleted: Boolean,
    val accent: Color,
    val icon: ImageVector,
    val detail: SQLTopicDetail
)

data class SQLTopicDetail(
    val summary: String,
    val definition: String,
    val keyCharacteristics: List<String> = emptyList(),
    val concepts: List<InfoItem> = emptyList(),
    val advantages: List<InfoItem> = emptyList(),
    val challenges: List<InfoItem> = emptyList(),
    val commonApplications: List<String> = emptyList(),
    val sqlExamples: List<SQLExample> = emptyList()
)

data class SQLExample(
    val title: String,
    val sql: String,
    val explanation: String
)

object SQLRepository {
    val sqlTopics: List<SQLTopic> = listOf(
        SQLTopic(
            id = "sql_basics",
            title = "SQL Basics",
            description = "Learn database fundamentals and basic SQL queries.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF00758F),
            icon = Icons.Rounded.TableChart,
            detail = SQLTopicDetail(
                summary = "SQL (Structured Query Language) is the standard language for managing relational databases.",
                definition = "SQL is a declarative language used to create, read, update, and delete data in relational database management systems (RDBMS). It operates on tables with rows and columns.",
                keyCharacteristics = listOf(
                    "Declarative language - describe what you want, not how to get it",
                    "Works with relational databases (tables, rows, columns)",
                    "Case-insensitive keywords (SELECT, select, Select all work)",
                    "CRUD operations: CREATE, READ (SELECT), UPDATE, DELETE"
                ),
                concepts = listOf(
                    InfoItem("Database", "Collection of organized tables"),
                    InfoItem("Table", "Collection of related data with rows and columns"),
                    InfoItem("Row/Record", "Single entry in a table"),
                    InfoItem("Column/Field", "Attribute of a table (e.g., name, age)"),
                    InfoItem("Primary Key", "Unique identifier for each row"),
                    InfoItem("Foreign Key", "Reference to primary key in another table")
                ),
                commonApplications = listOf(
                    "E-commerce databases (products, orders, customers)",
                    "Banking systems (accounts, transactions)",
                    "Social media platforms (users, posts, comments)",
                    "Hospital management (patients, appointments, records)",
                    "School systems (students, courses, grades)"
                ),
                sqlExamples = listOf(
                    SQLExample(
                        title = "Creating a Table",
                        sql = """CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE,
    grade CHAR(1),
    enrollment_date DATE DEFAULT CURRENT_DATE
);""",
                        explanation = "Creates a students table with 6 columns. PRIMARY KEY ensures student_id is unique. NOT NULL means name is required. UNIQUE prevents duplicate emails."
                    ),
                    SQLExample(
                        title = "Inserting Data",
                        sql = """-- Insert single record
INSERT INTO students (student_id, name, age, email, grade)
VALUES (1, 'Alice Johnson', 20, 'alice@email.com', 'A');

-- Insert multiple records
INSERT INTO students (student_id, name, age, email, grade)
VALUES 
    (2, 'Bob Smith', 22, 'bob@email.com', 'B'),
    (3, 'Carol White', 21, 'carol@email.com', 'A'),
    (4, 'David Brown', 23, 'david@email.com', 'C');""",
                        explanation = "INSERT adds new rows to table. Can insert one or multiple records at once. Values must match column order and data types."
                    ),
                    SQLExample(
                        title = "Basic SELECT Queries",
                        sql = """-- Select all columns
SELECT * FROM students;

-- Select specific columns
SELECT name, grade FROM students;

-- Select with condition
SELECT name, age 
FROM students 
WHERE age > 21;

-- Select with multiple conditions
SELECT name, email
FROM students
WHERE grade = 'A' AND age >= 20;""",
                        explanation = "SELECT retrieves data. * means all columns. WHERE filters rows. AND/OR combine conditions."
                    )
                ),
                advantages = listOf(
                    InfoItem("Standardized", "Works across MySQL, PostgreSQL, Oracle, SQL Server", DetailTone.Positive),
                    InfoItem("Powerful Queries", "Complex data retrieval with simple syntax", DetailTone.Positive),
                    InfoItem("Data Integrity", "Constraints ensure data quality", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Scalability", "Can be slow with very large datasets", DetailTone.Caution),
                    InfoItem("Schema Changes", "Altering table structure can be complex", DetailTone.Caution)
                )
            )
        ),
        SQLTopic(
            id = "sql_queries",
            title = "Advanced Queries",
            description = "Master filtering, sorting, and aggregating data.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFFE97451),
            icon = Icons.Rounded.Filter,
            detail = SQLTopicDetail(
                summary = "Learn to filter, sort, group, and aggregate data with SQL clauses.",
                definition = "Advanced SQL queries use WHERE, ORDER BY, GROUP BY, HAVING, and aggregate functions (COUNT, SUM, AVG, MAX, MIN) to analyze and summarize data.",
                keyCharacteristics = listOf(
                    "WHERE filters rows before grouping",
                    "GROUP BY groups rows with same values",
                    "HAVING filters groups after aggregation",
                    "ORDER BY sorts results (ASC ascending, DESC descending)"
                ),
                concepts = listOf(
                    InfoItem("Aggregate Functions", "COUNT(*), SUM(column), AVG(column), MAX(column), MIN(column)"),
                    InfoItem("WHERE vs HAVING", "WHERE filters rows, HAVING filters groups"),
                    InfoItem("DISTINCT", "Removes duplicate values from results"),
                    InfoItem("LIMIT", "Restricts number of rows returned")
                ),
                sqlExamples = listOf(
                    SQLExample(
                        title = "Sorting and Limiting",
                        sql = """-- Sort by age (ascending)
SELECT name, age 
FROM students 
ORDER BY age ASC;

-- Sort by grade (descending), then name
SELECT name, grade, age
FROM students
ORDER BY grade DESC, name ASC;

-- Get top 5 oldest students
SELECT name, age
FROM students
ORDER BY age DESC
LIMIT 5;""",
                        explanation = "ORDER BY sorts results. ASC is default. Multiple columns create nested sorting. LIMIT restricts output."
                    ),
                    SQLExample(
                        title = "Aggregate Functions",
                        sql = """-- Count total students
SELECT COUNT(*) AS total_students FROM students;

-- Average age
SELECT AVG(age) AS average_age FROM students;

-- Oldest and youngest
SELECT MAX(age) AS oldest, MIN(age) AS youngest 
FROM students;

-- Count students per grade
SELECT grade, COUNT(*) AS student_count
FROM students
GROUP BY grade
ORDER BY student_count DESC;""",
                        explanation = "Aggregate functions calculate statistics. GROUP BY creates groups. AS creates column aliases for readability."
                    ),
                    SQLExample(
                        title = "GROUP BY and HAVING",
                        sql = """-- Average age per grade
SELECT grade, AVG(age) AS avg_age
FROM students
GROUP BY grade;

-- Grades with more than 2 students
SELECT grade, COUNT(*) AS count
FROM students
GROUP BY grade
HAVING COUNT(*) > 2;

-- Students with age above average
SELECT name, age
FROM students
WHERE age > (SELECT AVG(age) FROM students);""",
                        explanation = "HAVING filters aggregated groups. Subqueries (SELECT inside SELECT) calculate values for WHERE conditions."
                    )
                ),
                commonApplications = listOf(
                    "Sales reports (total revenue, average order value)",
                    "Student grade analysis (class averages, top performers)",
                    "Inventory management (stock levels, low inventory alerts)",
                    "Website analytics (page views, unique visitors)"
                )
            )
        ),
        SQLTopic(
            id = "sql_joins",
            title = "Joins and Relationships",
            description = "Combine data from multiple tables with joins.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF0078D4),
            icon = Icons.Rounded.JoinInner,
            detail = SQLTopicDetail(
                summary = "Joins combine rows from two or more tables based on related columns.",
                definition = "SQL joins retrieve data from multiple tables using relationships defined by foreign keys. Different join types control which rows are included in results.",
                keyCharacteristics = listOf(
                    "INNER JOIN returns matching rows from both tables",
                    "LEFT JOIN returns all from left table, matching from right",
                    "RIGHT JOIN returns all from right table, matching from left",
                    "FULL OUTER JOIN returns all rows from both tables"
                ),
                concepts = listOf(
                    InfoItem("Foreign Key", "Column referencing primary key in another table"),
                    InfoItem("One-to-Many", "One record relates to many (customer to orders)"),
                    InfoItem("Many-to-Many", "Many records relate to many (students to courses)"),
                    InfoItem("Table Aliases", "Shortened names (students AS s, courses AS c)")
                ),
                sqlExamples = listOf(
                    SQLExample(
                        title = "INNER JOIN",
                        sql = """-- Students and their enrollments
SELECT s.name, s.grade, c.course_name, e.enrollment_date
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id
WHERE s.grade = 'A'
ORDER BY s.name;""",
                        explanation = "INNER JOIN combines matching rows. ON specifies join condition. Table aliases (s, e, c) simplify syntax."
                    ),
                    SQLExample(
                        title = "LEFT JOIN",
                        sql = """-- All students, including those not enrolled
SELECT s.name, c.course_name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
LEFT JOIN courses c ON e.course_id = c.course_id;

-- Students without any enrollments
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;""",
                        explanation = "LEFT JOIN includes all rows from left table. NULL appears when no match exists. Useful for finding missing relationships."
                    ),
                    SQLExample(
                        title = "Aggregating with Joins",
                        sql = """-- Count courses per student
SELECT s.name, COUNT(e.course_id) AS course_count
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.name
ORDER BY course_count DESC;

-- Average students per course
SELECT c.course_name, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.course_name
HAVING COUNT(e.student_id) > 0;""",
                        explanation = "Combine joins with aggregation to analyze relationships. GROUP BY includes primary key to ensure uniqueness."
                    )
                ),
                commonApplications = listOf(
                    "Order details with customer information",
                    "Product inventory with supplier data",
                    "Employee records with department information",
                    "Blog posts with author and comment data"
                )
            )
        ),
        SQLTopic(
            id = "sql_data_modification",
            title = "Data Modification",
            description = "Update, delete, and manage data in tables.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFFCC5803),
            icon = Icons.Rounded.DataArray,
            detail = SQLTopicDetail(
                summary = "Learn UPDATE, DELETE, and data manipulation commands.",
                definition = "Data modification commands change existing data (UPDATE), remove data (DELETE), or alter table structure (ALTER TABLE). These operations should be used carefully, especially without WHERE clauses.",
                keyCharacteristics = listOf(
                    "UPDATE modifies existing rows",
                    "DELETE removes rows permanently",
                    "Always use WHERE to target specific rows",
                    "Transactions ensure data consistency"
                ),
                concepts = listOf(
                    InfoItem("UPDATE SET", "Modifies column values in existing rows"),
                    InfoItem("DELETE FROM", "Removes rows (use WHERE carefully!)"),
                    InfoItem("ALTER TABLE", "Adds/modifies/drops columns"),
                    InfoItem("TRUNCATE", "Removes all rows quickly (can't be undone)")
                ),
                sqlExamples = listOf(
                    SQLExample(
                        title = "UPDATE Data",
                        sql = """-- Update single student's grade
UPDATE students
SET grade = 'A'
WHERE student_id = 1;

-- Update multiple columns
UPDATE students
SET grade = 'B', age = 23
WHERE student_id = 2;

-- Conditional update
UPDATE students
SET grade = 'A'
WHERE age > 22 AND grade = 'B';

-- Increment values
UPDATE students
SET age = age + 1
WHERE enrollment_date < '2020-01-01';""",
                        explanation = "UPDATE changes existing data. SET specifies new values. WHERE targets specific rows. Without WHERE, ALL rows update!"
                    ),
                    SQLExample(
                        title = "DELETE Data",
                        sql = """-- Delete specific student
DELETE FROM students
WHERE student_id = 5;

-- Delete multiple rows
DELETE FROM students
WHERE grade = 'F' AND age < 18;

-- Delete all (dangerous!)
DELETE FROM students;  -- Removes everything!

-- Better: TRUNCATE for clearing table
TRUNCATE TABLE students;  -- Faster, resets auto-increment""",
                        explanation = "DELETE removes rows permanently. TRUNCATE clears entire table faster. Always backup before DELETE!"
                    ),
                    SQLExample(
                        title = "ALTER TABLE",
                        sql = """-- Add new column
ALTER TABLE students
ADD COLUMN phone VARCHAR(20);

-- Modify column
ALTER TABLE students
MODIFY COLUMN email VARCHAR(150);

-- Drop column
ALTER TABLE students
DROP COLUMN phone;

-- Add constraint
ALTER TABLE students
ADD CONSTRAINT check_age CHECK (age >= 16);""",
                        explanation = "ALTER TABLE changes table structure. Can add/modify/drop columns or add constraints."
                    )
                ),
                commonApplications = listOf(
                    "Updating user profiles",
                    "Correcting data entry errors",
                    "Removing inactive accounts",
                    "Database schema evolution"
                ),
                advantages = listOf(
                    InfoItem("Precise Control", "Target specific rows with WHERE", DetailTone.Positive),
                    InfoItem("Batch Operations", "Update/delete multiple rows at once", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Irreversible", "Deleted data cannot be recovered without backup", DetailTone.Caution),
                    InfoItem("Cascade Effects", "Deleting parent may delete children (foreign keys)", DetailTone.Caution)
                )
            )
        ),
        SQLTopic(
            id = "sql_transactions",
            title = "Transactions & Constraints",
            description = "Ensure data integrity with transactions and constraints.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF107C10),
            icon = Icons.Rounded.Lock,
            detail = SQLTopicDetail(
                summary = "Transactions ensure data consistency. Constraints enforce data rules.",
                definition = "Transactions are sequences of SQL operations treated as a single unit. Constraints are rules that limit the type of data that can be stored in tables.",
                keyCharacteristics = listOf(
                    "ACID properties: Atomicity, Consistency, Isolation, Durability",
                    "COMMIT saves transaction changes permanently",
                    "ROLLBACK undoes transaction changes",
                    "Constraints enforce data integrity automatically"
                ),
                concepts = listOf(
                    InfoItem("BEGIN/COMMIT/ROLLBACK", "Start, save, or undo transaction"),
                    InfoItem("PRIMARY KEY", "Unique identifier, cannot be NULL"),
                    InfoItem("FOREIGN KEY", "References another table's primary key"),
                    InfoItem("CHECK", "Validates data meets condition"),
                    InfoItem("UNIQUE", "Ensures no duplicate values"),
                    InfoItem("NOT NULL", "Requires value, no empty fields")
                ),
                sqlExamples = listOf(
                    SQLExample(
                        title = "Transaction Example",
                        sql = """-- Bank transfer transaction
BEGIN TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE account_id = 2;

-- If both succeed, save changes
COMMIT;

-- If error occurs, undo everything
-- ROLLBACK;""",
                        explanation = "Transaction ensures both updates happen or neither. Prevents partial transfers. COMMIT saves, ROLLBACK cancels."
                    ),
                    SQLExample(
                        title = "Table Constraints",
                        sql = """CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10,2) CHECK (total_amount >= 0),
    status VARCHAR(20) DEFAULT 'pending',
    email VARCHAR(100) UNIQUE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);""",
                        explanation = "Constraints: PRIMARY KEY (unique ID), NOT NULL (required), CHECK (validation), UNIQUE (no duplicates), FOREIGN KEY (relationship). CASCADE deletes/updates related records."
                    ),
                    SQLExample(
                        title = "Adding Constraints",
                        sql = """-- Add primary key to existing table
ALTER TABLE students
ADD PRIMARY KEY (student_id);

-- Add foreign key
ALTER TABLE enrollments
ADD CONSTRAINT fk_student
FOREIGN KEY (student_id) REFERENCES students(student_id);

-- Add check constraint
ALTER TABLE students
ADD CONSTRAINT check_age 
CHECK (age >= 16 AND age <= 100);

-- Add unique constraint
ALTER TABLE students
ADD CONSTRAINT unique_email UNIQUE (email);""",
                        explanation = "Constraints can be added after table creation. Name constraints for easier management."
                    )
                ),
                commonApplications = listOf(
                    "Financial transactions (banking, payments)",
                    "E-commerce orders (cart to purchase)",
                    "Data validation (email format, age limits)",
                    "Referential integrity (parent-child relationships)"
                )
            )
        ),
        SQLTopic(
            id = "sql_design",
            title = "Database Design & Normalization",
            description = "Design efficient databases with normalization principles.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF881798),
            icon = Icons.Rounded.AccountTree,
            detail = SQLTopicDetail(
                summary = "Good database design prevents data redundancy and ensures data integrity.",
                definition = "Database design involves organizing data into tables and defining relationships. Normalization is the process of structuring tables to minimize redundancy and dependency.",
                keyCharacteristics = listOf(
                    "1NF: Each cell contains atomic (single) value",
                    "2NF: 1NF + no partial dependencies on composite keys",
                    "3NF: 2NF + no transitive dependencies",
                    "BCNF: Stricter version of 3NF"
                ),
                concepts = listOf(
                    InfoItem("Entity-Relationship", "ER diagrams visualize database structure"),
                    InfoItem("Redundancy", "Duplicate data wastes space and causes inconsistency"),
                    InfoItem("Normalization", "Process of organizing data to reduce redundancy"),
                    InfoItem("Denormalization", "Sometimes adds redundancy for performance")
                ),
                sqlExamples = listOf(
                    SQLExample(
                        title = "Unnormalized (Bad Design)",
                        sql = """CREATE TABLE bad_orders (
    order_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    product_names VARCHAR(500),  -- Multiple products in one field!
    product_prices VARCHAR(200),  -- Multiple prices in one field!
    total_amount DECIMAL(10,2)
);

-- Problems:
-- 1. Customer info duplicated for each order
-- 2. Multiple products in single cell (violates 1NF)
-- 3. Difficult to query individual products""",
                        explanation = "Bad design: customer data repeats, multiple values per cell, hard to query products."
                    ),
                    SQLExample(
                        title = "Normalized (Good Design)",
                        sql = """-- Separate customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
);

-- Orders reference customers
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Order items (many-to-many with products)
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);""",
                        explanation = "Good design: separate tables, no duplicates, easy to query, maintains data integrity through foreign keys."
                    )
                ),
                commonApplications = listOf(
                    "E-commerce systems (customers, orders, products)",
                    "Library systems (books, authors, borrowers)",
                    "School databases (students, courses, enrollments)",
                    "Hospital systems (patients, doctors, appointments)"
                ),
                advantages = listOf(
                    InfoItem("Data Integrity", "Constraints prevent invalid data", DetailTone.Positive),
                    InfoItem("No Redundancy", "Each fact stored once", DetailTone.Positive),
                    InfoItem("Easier Updates", "Change data in one place", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Complex Queries", "More joins needed to retrieve data", DetailTone.Caution),
                    InfoItem("Performance", "Sometimes denormalization improves speed", DetailTone.Caution)
                )
            )
        )
    )
}
