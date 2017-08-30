module.exports = {
    postCard: function(con, value, palo, number){
        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = "INSERT INTO cards (value, palo, number) VALUES ('" + value + "', '" + palo + "', '" + number + "')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log("1 record inserted");
          });
        });
    },
    postUser: function(con, name, callback){
        con.connect(function(err) {
          if (err) throw err;
          var sql = "INSERT INTO user (name) VALUES ('" + name + "')";
          con.query(sql, function (err, result) {
            callback(result.insertId);
          });
        });
    },
    getUser: function(con, id, callback){
        return new Promise((resolve, reject) => {
            con.connect(function(err) {
              if (err) throw err;
              con.query("SELECT * FROM user as u WHERE u.id = '" + id + "'", function (err, result, fields) {
                if (err) throw err;
                // callback(result[0]);
                resolve(result[0]);
              });
            });
        });
    },
    getAllUsersFromGame: function(con, gameId, callback){
        con.connect(function(err) {
          if (err) throw err;
          var sql = "INSERT INTO user (name) VALUES ('" + name + "')";
          con.query(sql, function (err, result) {
            callback(result.insertId);
          });
        });
    }
};
