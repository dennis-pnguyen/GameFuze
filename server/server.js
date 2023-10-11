/* eslint-disable no-unused-vars  -- Remove when used */
import 'dotenv/config';
import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// Endpoint to get all users of the database.
app.get('/api/tables/public.Users', async (req, res, next) => {
  try {
    const sql = `select "firstName", "lastName", "username", "email"
    from "Users"
    order by "userId"`;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Endpoint to allow user to sign-up
app.post('/api/sign-up', async (req, res, next) => {
  try {
    const { fullName, email, username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `insert into "Users" ("fullName", "email", "username", "hashedPassword")
    values ($1, $2, $3, $4)
    returning *`;
    const params = [fullName, email, username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Endpoint to authorize user login
app.post('/api/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new ClientError(401, 'Invalid login');
    const sql = `SELECT "userId", "hashedPassword"
      from "Users"
      where "username" = $1`;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) throw new ClientError(401, 'Invalid login');
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password)))
      throw new ClientError(401, 'Invalid login');
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

// Endpoint for user to create a review on a game
app.post('/api/tables/public.Reviews', async (req, res, next) => {
  try {
    if (!req.user) throw new ClientError(401, 'Not logged in');
    const { title, notes } = req.body;
    if (!title || !notes)
      throw new ClientError(400, 'Title and notes are required fields');
    const sql = `INSERT into "Reviews" ("userId", "title", "notes")
      values ($1, $2, $3)
      returning *`;
    const params = [req.user.userId, title, notes];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

// Endpoint to get a user's reviews
app.get('/api/tables/public.Reviews', async (req, res, next) => {
  try {
    if (!req.user) throw new ClientError(401, 'not logged in');
    const sql = ` select * from "Reviews"
      where "userId" = $1
      order by "reviewId" desc`;
    const result = await db.query(sql, [req.user.userId]);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Endpoint to retrieve a user's wishlist
app.get('/api/Wishlist', async (req, res, next) => {
  try {
    // if (!req.user) throw new ClientError(401, 'not logged in');
    const sql = ` select * from "Wishlist"
      where "userId" = 1
      order by "gameId" desc`;
    const result = await db.query(sql);
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);
  }
});

// Endpoint for adding to wishlist
app.post('/api/Wishlist', async (req, res, next) => {
  try {
    const { id, name, released, background_image: backgroundImage } = req.body;
    if (!id || !name || !released || !backgroundImage)
      throw new ClientError(400, 'Please select another game.');
    const sql = `
    insert into "Wishlist" ("userId", "gameId", "gameName", "released", "backgroundImage")
    values (1, $1, $2, $3, $4)
    returning *`;
    const params = [id, name, released, backgroundImage];
    const result = await db.query(sql, params);
    const [game] = result.rows;
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
});

// Endpoint for deleting from wishlist
app.delete('/api/Wishlist', async (req, res, next) => {
  try {
    // const userId = Number(req.params.userId);
    // if (!Number.isInteger(userId))
    //   throw new ClientError(400, 'userId must be an integer');
    const sql = `DELETE from "Wishlist"
      where "userId" = 1
      returning *`;

    const result = await db.query(sql);
    const [deleted] = result.rows;
    if (!deleted) throw new ClientError(404, 'Item not found');
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
