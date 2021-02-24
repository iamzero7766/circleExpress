var UserSql = {
    query: "SELECT userinfo(user_id, user_name, user_info) FROM userinfo;",
    queryById: "SELECT user_id, user_name, user_info, user_phone, user_back, user_avatar FROM userinfo WHERE user_id = ?;",
    search: "SELECT * FROM userinfo WHERE user_phone = ? AND user_password = ?;",
    searchPassword: "SELECT * FROM userinfo WHERE user_id = ? AND user_password = ?;",
    add: "INSERT INTO userinfo(user_name, user_password, user_info, user_phone) VALUES(?, ?, ?, ?);",
    queryPhone: "SELECT * FROM userinfo WHERE user_phone = ?;",
    updateName: "UPDATE userinfo SET user_name = ? WHERE user_id = ?;",
    updateInfo: "UPDATE userinfo SET user_info = ? WHERE user_id = ?;",
    updatePassword: "UPDATE userinfo SET user_password = ? WHERE user_id = ?;",
    updateBack: "UPDATE userinfo SET user_back = ? WHERE user_id = ?;",
    updateAvatar: "UPDATE userinfo SET user_avatar = ? WHERE user_id = ?;",
};

module.exports= UserSql;

