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
    postUser: function(con, name){
        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = "INSERT INTO user (name, state) VALUES ('" + name + "', SLEEP, '" + number + "')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted: " + result.insertId);
          });
        });
    },
    getUser: function(con, id){
        con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM user u WHERE u.id = " + id, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
          });
        });
    }
};
