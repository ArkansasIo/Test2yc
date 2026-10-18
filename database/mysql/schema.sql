CREATE DATABASE IF NOT EXISTS test2yc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE test2yc;

CREATE TABLE IF NOT EXISTS records (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  value TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_records_name (name)
) ENGINE=InnoDB;

INSERT INTO records (name,value) VALUES ('system','Test2yc MySQL database initialized')
ON DUPLICATE KEY UPDATE value=VALUES(value);
