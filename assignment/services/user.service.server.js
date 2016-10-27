/**
 * Created by Siddarthan on 26-Oct-16.
 */
module.exports = function (app) {
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: ""  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: ""  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: ""  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUser);
    app.get("/api/user/:userId", getUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res){
        var user = req.body;
        user._id = String((new Date()).getTime());
        users.push(user);
        res.send(JSON.parse(JSON.stringify(user)));
    }
    function getUser(req, res) {
        var query = req.query;
        if(query.username && query.password){
            findUserByCredentials(req, res);
        }else if(query.username){
            findUserByUserName(req, res);
        }
        //what to do here ??
    }

    function findUserByUserName(req, res){
        var username = req.query.username;
        for(var u in users){
            if(users[u].username === username){
                res.send(JSON.parse(JSON.stringify(users[u])));
                return;
            }
        }
        res.send('0'); // or return null
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users){
            if(users[u].username === username &&
                users[u].password === password){
                res.send(JSON.parse(JSON.stringify(users[u])));
                return;
            }
        }
        res.send('0');
    }

    function getUserById(req, res){
        var userId = req.params.userId;
        for(var u in users){
            if(users[u]._id === userId){
                res.send(JSON.parse(JSON.stringify(users[u])));
                return;
            }
        }
        res.send('0'); // or return null
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        for(var u in users){
            if(users[u]._id === userId){
                users[u] = user;
                res.send(200);
                return;
            }
        }
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for(var u in users){
            if(users[u]._id === userId){
                users.splice(u, 1);
                res.send(200);
                return;
            }
        }
    }
};