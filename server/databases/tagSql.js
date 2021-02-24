var tagSql = {
  query: "SELECT * FROM taglist;",
  add: "INSERT INTO taglist(value) VALUES(?);",
};
module.exports = tagSql;
