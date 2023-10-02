-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

INSERT into "Users" ("fullName", "email", "username", "hashedPassword")
VALUES ('Dennis Nguyen', 'testemail@test.com', 'Tomato_IRL', '15c4683193f210ca9c640af9241e8c18'), --thisisapassword
  ('Homer Simpson', 'chunkylover45@homerjs.com', 'homerjs', '2d690ff9d892727aaed9a13c639faea6'), --homerjspassword
  ('Anakin Skywalker', 'ripyounglings@jedioutcast.com', 'deathtoyounglings', 'a332572c99f2da031659ceefe49ac3c8'); --ikilledyounglings
