var UserSql = {
    queryToday: "SELECT * FROM diary_info WHERE user_id = ? AND dt_create = ?;",
    query: "SELECT * FROM diary_info WHERE user_id = ? AND dt_create >= ? AND dt_create <= ?;",
    add: "INSERT INTO diary_info(user_id, temp, dt_create, type, value, content) VALUES(?, ?, ?, ?, ?, ?);",
    update: "UPDATE diary_info SET content=?, value = ? WHERE user_id = ? AND dt_create = ?",
};

module.exports = UserSql;
