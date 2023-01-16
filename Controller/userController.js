const connection = require("../Model/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  try {
    const { first_name, last_name, email ,password, cpassword } = req.body;
    connection.query(
      "SELECT * FROM userIdentity where email=?",
      [email],
      (err, data) => {
        if (err) {
          return res.status(500).json({ status: false, message: err.message });
        } else {
          if (data.length > 0) {
            return res
              .status(200)
              .json({ status: false, message: "Email already exists..." });
          } else {
            if (password !== cpassword) {
              return res.status(200).json({
                status: false,
                message: "Password and Confirm Password are not matched!",
              });
            }

            bcrypt.hash(password, 10, (err, hashPassword) => {
              if (err) {
                return res
                  .status(500)
                  .json({ status: false, message: err.message });
              } else {
                connection.query(
                  `INSERT INTO userIdentity(first_name,last_name,email,password) VALUES(?,?,?,?)`,
                  [first_name,last_name, email, hashPassword],
                  (err, result) => {
                    if (err) {
                      return res
                        .status(500)
                        .json({ status: false, message: err.message });
                    } else {
                      return res.status(201).json({
                        status: true,
                        message: "Record inserted successfully!",
                      });
                    }
                  }
                );
              }
            });
          }
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(209)
        .json({ status: false, message: "Email or password is required" });
    }

    connection.query(
      "SELECT * FROM userIdentity WHERE email=?",
      [email],
      (err, result) => {
        if (err) {
          return res.status(500).json({ status: false, message: err.message });
        } else {
          if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
              if (err) {
                return res
                  .status(500)
                  .json({ status: false, message: err.message });
              } else {
                if (isMatch) {
                  const token = jwt.sign(
                    { id: result[0].id },
                    process.env.SECRET_KEY,
                    { expiresIn: "1h" }
                  );

                  return res.status(201).json({
                    status: true,
                    message: "You are logged in!",
                    token,
                  });
                } else {
                  return res.status(209).json({
                    status: false,
                    message: "Invalid Email or Password!",
                  });
                }
              }
            });
          } else {
            return res
              .status(209)
              .json({ status: false, message: "Invalid Email or Password!" });
          }
        }
      }
    );
  } catch (err) {
    return res.sttaus(500).json({ status: false, message: err.message });
  }
};

module.exports.userList = async (req, res) => {
  try {
    connection.query("SELECT * FROM userIdentity", (err, result) => {
      if (err) {
        return res.status(500).json({ status: false, message: err.message });
      } else {
        return res.status(200).json({ status: true, result });
      }
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};