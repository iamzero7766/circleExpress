var UserSql = {
    query: "SELECT * FROM userinfo;",
    search: "SELECT * FROM userinfo WHERE user_id = ? AND user_password = ?;"
};

module.exports= {
    UserSql: UserSql
};
