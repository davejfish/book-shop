-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS books_to_authors;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob DATE,
    pob VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released NUMERIC NOT NULL
);

CREATE TABLE books_to_authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    author_id BIGINT,
    book_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO authors (
    name, dob, pob
) VALUES
('bob', '1900-05-05T08:00:00.000Z', 'over there'),
('shan', '1987-08-01', 'oregon'),
('bill', '1970-04-25', 'california'),
('ted', '1971-09-018', 'cali');

INSERT INTO books (
    title, released
) VALUES
('excellent book', 1980),
('cool book', 1982),
('blue book', 1700);

INSERT INTO books_to_authors (
    author_id, book_id
) VALUES
(1, 2),
(2, 3),
(3, 1),
(4, 1);
