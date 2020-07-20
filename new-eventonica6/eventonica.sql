--  CREATE TABLE users(
--  	ID SERIAL PRIMARY KEY,
-- 	  user_name text NOT NULL,
--  	personal_event text
--);

--   CREATE TABLE events (
-- 	 ID SERIAL PRIMARY KEY,
--      event_name text NOT NULL,
--      event_id integer NOT NULL UNIQUE,
--      event_date text NOT NULL,
--      event_category text NOT NULL,
--     event_keyword text NOT NULL
	
--   );

--  CREATE TABLE user_events (
--  	user_id integer NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
-- 	event_id integer NOT NULL UNIQUE REFERENCES events (id) ON DELETE CASCADE
-- );

--INSERT INTO users (user_name) VALUES ('kate');
--  DELETE FROM users WHERE user_name = 'kate';



SELECT * FROM user_events;

