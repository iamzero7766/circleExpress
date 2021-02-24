var questionSql = {
  addFollow: "INSERT INTO followlist(user_id, question_id) VALUES(?, ?);",
  delete: "DELETE FROM followlist WHERE user_id = ? AND question_id = ?;",
  search: "SELECT * FROM followlist WHERE user_id = ? AND question_id = ?;",
  searchByUser: "SELECT * FROM followlist WHERE user_id = ? LIMIT ?, ?;"
};
module.exports = questionSql;