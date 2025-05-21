require('dotenv').config();
const {
  CognitoIdentityProviderClient,
  SignUpCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const crypto = require('crypto');

// AWS SDK 클라이언트 생성
const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

// 🔐 SecretHash 생성 함수
function generateSecretHash(username) {
  return crypto
    .createHmac('sha256', process.env.COGNITO_CLIENT_SECRET)
    .update(username + process.env.COGNITO_CLIENT_ID)
    .digest('base64');
}

// ✅ 회원가입 함수
exports.registerUser = async (username, password) => {
  console.log('📦 회원가입 요청 → username:', username);

  const command = new SignUpCommand({
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: username, // 이메일을 Cognito의 username으로 사용
    Password: password,
    SecretHash: generateSecretHash(username),
    UserAttributes: [
      {
        Name: 'email',
        Value: username, // 이메일도 별도 속성으로 등록
      },
    ],
  });

  return await client.send(command);
};
