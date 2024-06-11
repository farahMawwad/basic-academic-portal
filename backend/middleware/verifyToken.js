const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader === 'undefined' || !bearerHeader.startsWith('Bearer ')) {
    res.sendStatus(403);
  
  } else {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        
        req.authData = authData;
        next();
      }
    });
  }
}

module.exports = verifyToken;