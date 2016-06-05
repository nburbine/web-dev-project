module.exports = function (app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        for (var i in users) {
            if (users[i].username === newUser.username) {
                res.status(400).send("Username " + newUser.username + " is already in use");
                return;
            }
        }

        newUser._id = (new Date().getTime()).toString();
        users.push(newUser);
        res.json(newUser);
    }

    function findUserByCredentials(username, password, res) {
        for (var i in users) {
            if (users[i].username === username &&
                users[i].password === password) {
                res.send(users[i]);
                return;
            }
        }
        res.status(401).send("Invalid username/password combination");
    }

    function findUserByUsername(username, res) {
        for (var i in users) {
            if (users[i].username === username) {
                res.send(users[i]);
                return;
            }
        }
        res.send(400);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id === userId) {
                res.send(users[i]);
                return;
            }
        }
        res.send(400);
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].email = newUser.email;
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: " + id + " not found");
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        for (var i in users) {
            if (users[i]._id === id) {
                users.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.status(400).send("User with ID: " + id + " not found");
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }
};
