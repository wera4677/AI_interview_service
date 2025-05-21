const express = require('express');
const router = express.Router();
const { registerUser } = require('../services/cognito');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await registerUser(username, password);
    res.status(201).json({ message: '회원가입 성공!', result });
  } catch (err) {
    console.error('❌ 회원가입 에러:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
