const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader); 
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.startsWith('Bearer ')
  ? authHeader.split(' ')[1]
  : authHeader;

try {
  const decoded = jwt.verify(token, SECRET);
  req.usersId = decoded.userId;
  next();
} catch (err) {
  res.status(401).json({ error: 'Token inválido' });
}
};