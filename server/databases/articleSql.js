var articleSql = {
  query: "SELECT * FROM arcticle ORDER BY dt_create DESC LIMIT ?, ?;",
  queryAll: "SELECT * FROM arcticle ORDER BY dt_create DESC;",
  queryInfo: "SELECT arcticle_id, arcticle_title, arcticle_content, dt_create, type, tips, original, arcticle.user_id, user_info, user_avatar, user_name FROM arcticle, userinfo WHERE arcticle.user_id = userinfo.user_id AND arcticle_id = ?;",
  add: "INSERT INTO arcticle(arcticle_title, user_id, arcticle_content, dt_create, type, tips, original) VALUES(?, ?, ?, ?, ?, ?, ?);",
  update: "UPDATE arcticle SET arcticle_content=? WHERE arcticle_id = ?;",
  delete: "DELETE FROM arcticle WHERE arcticle_id = ?;",
  queryByUser: "SELECT * FROM arcticle WHERE user_id = ? ORDER BY dt_create DESC LIMIT ?, ?;",
  queryCount: "SELECT COUNT(*) FROM arcticle WHERE user_id = ?;"
};
module.exports = articleSql;