var commentSql = {
  addComment: "INSERT INTO articlecomment(article_id, user_id, content, parent_id, dt_create) VALUES(?, ?, ?, ?, ?);",
  delete: "DELETE FROM articlecomment WHERE comment_id = ?;",
  searchByArticle: "SELECT comment_id, article_id, articlecomment.user_id, content, parent_id, dt_create, isread, user_info, user_name, user_avatar FROM articlecomment, userinfo WHERE articlecomment.user_id = userinfo.user_id AND articlecomment.article_id = ? ORDER BY dt_create DESC LIMIT ?, ?;",
  queryTotal: "SELECT COUNT(*) FROM articlecomment WHERE article_id = ?;",
  searchByUser: "SELECT * FROM articlecomment WHERE user_id = ? ORDER BY dt_create DESC LIMIT ?, ?;"

};
module.exports = commentSql;