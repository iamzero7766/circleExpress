var questionSql = {
  queryById: "SELECT * FROM questioninfo WHERE question_id = ?;",
  query: "SELECT * FROM questioninfo ORDER BY dt_create DESC LIMIT ?, ?;",
  queryAll: "SELECT * FROM questioninfo ORDER BY dt_create DESC",
  add: "INSERT INTO questioninfo(question_title, question_info, user_id, anonymous, dt_create) VALUES(?, ?, ?, ?, ?);",
  update: "UPDATE questioninfo SET question_info = ?, anonymous = ?, dt_create = ? WHERE question_id = ?;",
  delete: "DELETE FROM questioninfo WHERE question_id = ?;",
  queryByUser: "SELECT * FROM questioninfo WHERE user_id = ? ORDER BY dt_create DESC LIMIT ?, ?;",
  queryCount: "SELECT COUNT(*) FROM questioninfo WHERE user_id = ?;"
};

module.exports = questionSql;
