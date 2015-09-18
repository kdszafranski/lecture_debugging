var express = require('express');
var router = express.Router();
var path = require('path');

// Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_walking_skeleton');

// Cat model tied to MongoDB
var Cat = mongoose.model('Cat', {name: String});

// Handle routes
router.post('/add', function(request, response, next){
    var kitty = new Cat({name: request.body.name});
    kitty.save(function(err){
        if(err) console.log('meow %s', err);
        response.send(kitty.toJSON());
        next();
    });
});

router.get('/cats', function(request, response, next){
    return Cat.find({}).exec(function(err, cats){
        if(err) throw new Error(err);
        response.send(JSON.stringify(cats));
        next();
    });
});

// concatenate all cat names in our db and return as a long string
router.get('/conKitty', function(req, res, next) {
    var names = "";
    return Cat.find({}).exec(function(err, list) {
        if(err) throw new Error(err);
        for(var i = 0; i < list.length; i++) {
            if(list[i].name) {
                var thisName = list[i].name.replace(" ", "-");

                if(i == list.length - 1) {
                    // last
                    names += thisName;
                } else {
                    names += thisName + "-";
                }
            }
        }
        res.send(JSON.stringify(names));
        next();
    });
});

router.get('/caro', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/views/caro.html'));
});

router.get('/', function(req,res,next){
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
//replace(/ /gi, "-");
module.exports = router;