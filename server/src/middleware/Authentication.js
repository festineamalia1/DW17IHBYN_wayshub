  const jwt = require("jsonwebtoken");
  const Key = process.env.KEY;

  exports.authenticated = (req, res, next) => {
    let header, token;

    if (
      !(header = req.header("Authorization")) ||
      !(token = header.replace("Bearer ", ""))
    ) {
      return res.status(400).send({
        error: {
          message: "Access Denied",
        },
      });
    }

    try {
      const verified = jwt.verify(token, Key);

      req.user = verified;
      next(); 
    } catch (error) {
      console.log(error);
      res.status(400).send({
        error: {
          message: "Invalid Token",
        },
      });
    }
  };
  