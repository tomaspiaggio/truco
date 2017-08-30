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
    }
};

// function getLastRecord(name)
// {
//     return new Promise(function(resolve, reject) {
//         // The Promise constructor should catch any errors thrown on
//         // this tick. Alternately, try/catch and reject(err) on catch.
//         var connection = getMySQL_connection();
//
//         var query_str =
//         "SELECT name, " +
//         "FROM records " +
//         "WHERE (name = ?) " +
//         "LIMIT 1 ";
//
//         var query_var = [name];
//
//         connection.query(query_str, query_var, function (err, rows, fields) {
//             // Call reject on error states,
//             // call resolve with results
//             if (err) {
//                 return reject(err);
//             }
//             resolve(rows);
//         });
//     });
// }
