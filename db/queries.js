import pool from './pool.js';

async function getMessage(id) {
  try {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function getAllMessages() {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM messages ORDER BY added DESC',
    );
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function createMessage(username, text, timestamp) {
  try {
    await pool.query(
      'INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)',
      [username, text, timestamp],
    );
  } catch (error) {
    console.error(error);
  }
}

async function deleteMessage(id) {
  try {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
  } catch (error) {
    console.error(error);
  }
}

async function deleteAllMessages() {
  try {
    await pool.query('DELETE FROM messages');
  } catch (error) {
    console.error(error);
  }
}

export {
  getMessage,
  getAllMessages,
  createMessage,
  deleteMessage,
  deleteAllMessages,
};
