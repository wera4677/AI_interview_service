require('dotenv').config();

const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('✅ 서버 실행 중: http://localhost:3000');
});

console.log('✅ 확인용 COGNITO_CLIENT_SECRET:', process.env.COGNITO_CLIENT_SECRET);
