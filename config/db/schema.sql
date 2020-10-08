DROP DATABASE IF EXISTS freshFeast_db;
CREATE DATABASE freshFeast_db;
USE freshFeast_db;

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR (30) NOT NULL
);

CREATE TABLE masterFood (
    id int NOT NULL AUTO_INCREMENT,
	foodName VARCHAR (255) NOT NULL,
    foodCategory VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);

-- CREATE TABLE expiration (
--     id INT NOT NULL AUTO_INCREMENT,
--     foodName VARCHAR (255) NOT NULL,
--     foodCategory VARCHAR (255) NOT NULL,
--     eaten BOOLEAN DEFAULT false,
--     PRIMARY KEY (id)
-- );

