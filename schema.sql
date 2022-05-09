DROP TABLE IF EXISTS movieTable;

CREATE TABLE IF NOT EXISTS movieTable(
id SERIAL PRIMARY KEY,
title VARCHAR(255),
release_date VARCHAR(255),
poster_path VARCHAR(255),
overview VARCHAR(1000)
comments VARCHAR(1000)
);
