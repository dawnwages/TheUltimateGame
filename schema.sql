DROP DATABASE IF EXISTS `ultimategame_db`;
CREATE DATABASE `ultimategame_db`;

USE ultimategame_db;

CREATE TABLE player(
id INT NOT NULL AUTO_INCREMENT,
char_name VARCHAR(200) NOT NULL,
hp INT NOT NULL DEFAULT 10,
attack INT NOT NULL DEFAULT 10,
pet_id INT NOT NULL DEFAULT 10,
coins INT NULL DEFAULT 10,
lvl_comp INT NOT NULL DEFAULT 10,
auth_id INT NOT NULL DEFAULT 10,
PRIMARY KEY (id)
);

CREATE TABLE pet(
id INT NOT NULL AUTO_INCREMENT,
pet_name VARCHAR(200) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE auth(
id INT NOT NULL AUTO_INCREMENT,
eamil VARCHAR(200) NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO player (char_name)
VALUES ("Goku"), ("Homer Simpson"), ("Bart Simpson"), ("Tommy Pickles"), ("Dexter"), ("Johnny Bravo"), ("Sonic the Hedgehog"), ("Daria Morgendorffer"), ("Doug"), ("Stewie Griffin"), ("Skeeter"), ("Susie Carmichael")