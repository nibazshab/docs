# 数据库基本指南

基本使用

```sql
-- 增删改查
INSERT INTO products (name, price, cover) VALUES ('Apple', 1.2, 'apple.jpg');
SELECT * FROM products WHERE price > 1.0;
UPDATE products SET price = 1.5 WHERE name = 'Apple';
DELETE FROM products WHERE name = 'Apple';

-- 按照 id 倒序获取前 5 条数据，跟 OFFSET 5 表示跳过前 5 行, DESC 降序，ASC 升序
SELECT * FROM tablename ORDER BY id DESC LIMIT 5;

-- 清空表
DELETE FROM tablename;

-- 删除表
DROP TABLE tablename;

-- 记录阅读量 +1
UPDATE xxxxx SET count = count+1 WHERE id = 1;

-- 将 file_url 表中的 url 列中所有 apple 字段替换成 banana
UPDATE file_url SET url = replace (url, 'apple', 'banana');
```

创建表名为 user，id 主键，整数型，自增长，user 字符串型，最大长度 30，不为空

```sql
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(30) NOT NULL
);
```

## MySQL / MariaDB

TEXT 类型最大 64k，MEDIUMTEXT 类型最大 16m，LONGTEXT 类型最大 4g

```sql
show databases;         -- 列出所有数据库
show tables;            -- 列出所有表
show columns from user; -- 查看 user 表的结构
show create table user; -- 查看 user 表的创建语句
```

连接数据库，后面跟数据库名称可连接指定数据库（test），本机可省略 -h，无密码可省略 -p

```sh
mysql -h 127.0.0.1 -u root -p123456 test
```

- 数据导出 sql 文件

增加 --no-tablespaces 参数无视表结构，--set-gtid-purged=OFF 不包含 GTID，后跟表名可单独导出一张表

```sh
mysqldump -h 127.0.0.1 -u root -p123456 database_name > db.sql
```

- 恢复 sql 数据

```sh
mysql -u root -p database_name < db.sql
```

或者

```sql
use database_name
source /sql/file.sql
```

- 设置密码

```sql
USE mysql
SET password = PASSWORD('newpassward');
FLUSH PRIVILEGES;
```

如果出现 ERROR 1064 (42000)，尝试去除 PASSWORD() 函数，直接写密码

## SQLite

支持的数据类型见 [https://sqlite.org/datatype3.html#affinity_name_examples](https://sqlite.org/datatype3.html#affinity_name_examples)

```sql
.table       -- 列出所有表
.schema user -- 查看 user 表的创建语句
```
