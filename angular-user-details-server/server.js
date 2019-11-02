var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var port = 3000;

var db = mongoose.connect("mongodb://localhost:27017/AngularUserDetails", (err, response) => {
    if (err) { console.log(err); }
    else { console.log('Connected to' + db, '+', response); }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    email: { type: String },
    date: { type: String }
}, { versionKey: false });

var familyMemberSchema = new Schema({
    userid: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: String },
    mobno: { type: String },
    gender: { type: String }
}, { versionKey: false });


var model = mongoose.model("users", userSchema, 'users');
var membermodel = mongoose.model("familyMember", familyMemberSchema, 'familyMember')

app.post("/api/saveMember", (req, res) => {
    // console.log(req.body);
    var mod = new membermodel(req.body);
    if (req.body.mode == 'Save') {
        mod.save((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    } else {
        var mod = new membermodel(req.body);
        membermodel.findByIdAndUpdate(req.body._id, { firstName: req.body.firstName }, (err, data) => {
            //console.log(req.body._id);
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Record has been updated" });
            }
        });
    }
});

app.post("/api/saveUser", (req, res) => {
    var mod = new model(req.body);
    if (req.body.mode == 'Save') {
        mod.save((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    } else {
        model.findByIdAndUpdate(req.body.id, { firstName: req.body.firstName, lastName: req.body.lastName }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Record has been updated" });
            }
        });
    }
});

app.post("/api/getUser", (req, res) => {
    // console.log(req);
    
    model.find({ email: req.body.email, password: req.body.password }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.get("/api/getMember", (req, res) => {
    membermodel.find({}, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.delete("/api/deleteMember", (req, res) => {
    console.log(req.query.memberId);
    membermodel.remove({ _id: req.query.memberId }, (err) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: 'Record has been deleted' });
        }
    })
});

// app.get("/api/getMemberByUserId", (req, res) => {
//     membermodel.find({userid: req.query.userId}, (err, data) => {
//         console.log(req.query.userId);
//         if(err){
//             res.send(err);
//         }
//         else {
//             console.log(data);
//             res.send( data );
//         }

//     })
// });

app.get("/api/getMemberByUserId", (req, res) => {
    membermodel.find({ userid: req.query.userId }, (err, data) => {
        console.log(req.query.userId);
        if (err) {
            res.send(err);
        }
        else {
            console.log(data);
            res.send(data);
        }

    })
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});