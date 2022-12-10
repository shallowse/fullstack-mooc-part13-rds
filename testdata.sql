--Users
INSERT INTO users (username, name, created_at, updated_at, admin, disabled) 
       VALUES ('john', 'John Harper', NOW(), NOW(), true, false);
INSERT INTO users (username, name, created_at, updated_at, admin, disabled) 
       VALUES ('avery', 'Avery Skyler', NOW(), NOW(), false, false);
INSERT INTO users (username, name, created_at, updated_at, admin, disabled) 
       VALUES ('madison', 'Madison Loren', NOW(), NOW(), false, true);

--Notes
INSERT INTO notes (content, important, date, user_id)
       VALUES ('note1', true, NOW(), 1);
INSERT INTO notes (content, important, date, user_id)
       VALUES ('note2', false, NOW(), 1);
INSERT INTO notes (content, important, date, user_id)
       VALUES ('note3', false, NOW(), 2);

--user_notes
INSERT INTO user_notes (user_id, note_id) VALUES (1, 1);
INSERT INTO user_notes (user_id, note_id) VALUES (1, 2);
INSERT INTO user_notes (user_id, note_id) VALUES (2, 2);
INSERT INTO user_notes (user_id, note_id) VALUES (3, 1);
INSERT INTO user_notes (user_id, note_id) VALUES (3, 3);

--Blogs
INSERT INTO blogs (author, url, title, created_at, updated_at, user_id, year) 
       VALUES ('Alice Test', 'https://example.com/test', 'Writing Components', NOW(), NOW(), 1, 2022);
INSERT INTO blogs (author, url, title, created_at, updated_at, user_id, year)
        VALUES ('Martin Fowler', 'https://martinfowler.com/', 'Is High Quality Software Worth the Cost?', NOW(), NOW(), 1, 2020);
INSERT INTO blogs (author, url, title, created_at, updated_at, user_id, year)
      VALUES ('Robert C. Martin', 'https://en.wikipedia.org/wiki/Robert_C._Martin', 'FP vs. OO List Processing', NOW(), NOW(), 2, 2010);
INSERT INTO blogs (author, url, title, created_at, updated_at, user_id, year)
      VALUES ('Author 1', 'https://example.com/1', 'Title 1', NOW(), NOW(), 3, 2022);
INSERT INTO blogs (author, url, title, created_at, updated_at, user_id, year)
      VALUES ('Author 2', 'https://example.com/2', 'Title 2', NOW(), NOW(), 3, 2010);


--readinglists
INSERT INTO readinglists (user_id, blog_id, read)
       VALUES (1, 1, true);
INSERT INTO readinglists (user_id, blog_id, read)
       VALUES (1, 2, false);
INSERT INTO readinglists (user_id, blog_id, read)
       VALUES (1, 3, false);
INSERT INTO readinglists (user_id, blog_id, read)
       VALUES (2, 2, true);
INSERT INTO readinglists (user_id, blog_id, read)
       VALUES (2, 3, false);

--teams
INSERT INTO teams (name) VALUES ('toska');
INSERT INTO teams (name) VALUES ('mosa clibmers');

--memberships
INSERT INTO memberships (user_id, team_id) VALUES (1, 1);
INSERT INTO memberships (user_id, team_id) VALUES (1, 2);
INSERT INTO memberships (user_id, team_id) VALUES (2, 1);
INSERT INTO memberships (user_id, team_id) VALUES (3, 2);
