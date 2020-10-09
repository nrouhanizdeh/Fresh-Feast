DROP DATABASE IF EXISTS freshFeast_db;
CREATE DATABASE freshFeast_db;
USE freshFeast_db;

CREATE TABLE masterFood (
    id int NOT NULL AUTO_INCREMENT,
	foodName VARCHAR (255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    days INT (15) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);



