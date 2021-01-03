var answerSql = {
  queryByQuestion: "SELECT * FROM question_answer WHERE question_id = ? ORDER BY dt_create DESC LIMIT 0, 20;",
  queryTotal: "SELECT COUNT(*) FROM question_answer WHERE question_id = ?",
  query: "SELECT * FROM question_answer ORDER BY dt_create DESC LIMIT ?, ?;",
  add: "INSERT INTO question_answer(question_id, user_id, answer_info, anonymous, dt_create) VALUES(?, ?, ?, ?, ?);",
  update: "UPDATE question_answer SET answer_info = ?, anonymous = ?, dt_create = ? WHERE question_id = ? AND user_id = ?;",
  delete: "DELETE FROM question_answer WHERE question_id = ? AND user_id = ?;"
};

module.exports = answerSql;