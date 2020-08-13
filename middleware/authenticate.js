//TODO: implement authentication

const authenticateUser = (req, res, next) => {
  try {
    // take authorization token and authorize
    console.log(req.headers);
    next();
  } catch (err) {
    // handle errors accordingly
    res.status(403).json({ error: 'Not authorized' });
  }
};

module.exports = authenticateUser;
