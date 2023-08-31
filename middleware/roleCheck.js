const roleCheck = (requiredRoles) => (req, res, next) => {
  if(req.user) {
    if(requiredRoles.includes(req.user.role)) {
      next();
    } else {
      res.invalidRequest({message: 'You are not authorized for this route'});
    }
  } else {
    res.invalidRequest({message: 'You are not authorized for this route'});
  }
}

module.exports = roleCheck;