CREATE TABLE blogs (
  SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Dan Abramov', 'https://github.com/gaearon', 'Writing Resilient Components');
INSERT INTO blogs (author, url, title) VALUES ('Martin Fowler', 'https://martinfowler.com/', 'Is High Quality Software Worth the Cost?');
INSERT INTO blogs (author, url, title) VALUES ('Robert C. Martin', 'https://en.wikipedia.org/wiki/Robert_C._Martin', 'FP vs. OO List Processing');
