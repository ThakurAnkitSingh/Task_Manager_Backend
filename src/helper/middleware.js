const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, token not found' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { userAuth };