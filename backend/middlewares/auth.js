const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    req.isAdmin = decoded.admin; 
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
