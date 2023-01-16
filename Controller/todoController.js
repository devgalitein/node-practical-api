const connection = require("../Model/config");

module.exports.getCategoryList = async (req, res) => {
  try {
    const q = "SELECT * FROM category";
    connection.query(q, (err, result) => {
      if (err) {
        return res.status(500).json({ status: false, message: err.message });
      } else {
        return res.status(200).json({ status: true, result });
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.messafe,
    });
  }
};

module.exports.createTodos = async (req, res) => {
  try {
    const { categoryId, title, description, datetime } = req.body;
    connection.query(
      `INSERT INTO todo(categoryId,title,description,datetime,added_by) VALUES(?,?,?,?,?)`,
      [categoryId, title, description, new Date(datetime), req.user[0].id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ status: false, message: err.message });
        } else {
          return res
            .status(201)
            .json({ status: true, message: "Todos Added successfully!" });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports.getTodosList = async (req, res) => {
  try {
    const queryString = req.query;
    const querySTringData = Object.keys(queryString).length === 0;
    let query;
    let dynamicQuery;
    if (querySTringData) {
      query = "SELECT * FROM todo";
    } else {
      query = "SELECT * FROM todo WHERE ";
      if (Object.keys(queryString).length === 1) {
        query += `${Object.keys(queryString)[0]} = ${
          Object.values(queryString)[0]
        }`;
      } else {
        for (const [index, [key, value]] of Object.entries(
          Object.entries(queryString)
        )) {
          if (index == 0) {
            dynamicQuery = `${key} = ${value} `;
          } else {
            dynamicQuery += `AND ${key} = ${value} `;
          }
        }
        query += dynamicQuery;
      }
    }
    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ status: false, message: err.message });
      } else {
        return res.status(200).json({
          status: true,
          result,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
