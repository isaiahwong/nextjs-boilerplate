export default function responseHandler(req, res, next) {
  res.respond = (status = 200, data = {}) => {
    const response = {
      success: status < 400,
      d: { ...data },
      a: req.isAuthenticated()
    };

    return res.status(200).json(response);
  };

  res.ok = (data = {}) => {
    const response = {
      success: true,
      d: { ...data },
      a: req.isAuthenticated()
    };

    return res.status(200).json(response);
  };
  next();
}
