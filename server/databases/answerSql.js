var answerSql = {
  queryByQuestion: "SELECT * FROM question_answer WHERE question_id = ? ORDER BY dt_create DESC LIMIT ?, ?;",
  queryByUser: "SELECT * FROM question_answer WHERE user_id = ? ORDER BY dt_create DESC LIMIT ?, ?;",
  queryTotal: "SELECT COUNT(*) FROM question_answer WHERE question_id = ?",
  query: "SELECT * FROM question_answer WHERE question_id = ? ORDER BY dt_create DESC LIMIT ?, ?;",
  add: "INSERT INTO question_answer(question_id, user_id, answer_info, anonymous, dt_create) VALUES(?, ?, ?, ?, ?);",
  update: "UPDATE question_answer SET answer_info = ?, anonymous = ?, dt_create = ? WHERE question_id = ? AND user_id = ?;",
  delete: "DELETE FROM question_answer WHERE question_id = ? AND user_id = ?;",
  queryById: "SELECT * FROM question_answer WHERE question_id = ? AND user_id = ?;",
  queryQuestionInfo: "SELECT question_id, question_answer.user_id, answer_info, anonymous, dt_create, user_name, user_info, user_avatar FROM question_answer, userinfo WHERE question_answer.user_id = userinfo.user_id AND question_answer.question_id = ? ORDER BY dt_create DESC LIMIT ?, ?;",
  queryCount: "SELECT COUNT(*) FROM question_answer WHERE user_id = ?;"
};

module.exports = answerSql;