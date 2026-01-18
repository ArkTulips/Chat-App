const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/authMiddleware");

/*
GET /api/messages/:userId
Fetch chat history with another user
Query params:
- limit (default 20)
- offset (default 0)
*/
router.get("/:userId", auth, async (req, res) => {
  try {
    const myId = req.user.id;
    const otherId = req.params.userId;

    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const messages = await pool.query(
      `
      SELECT *
      FROM messages
      WHERE 
        (sender_id = $1 AND receiver_id = $2)
        OR
        (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC
      LIMIT $3 OFFSET $4
      `,
      [myId, otherId, limit, offset]
    );

    res.json(messages.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
