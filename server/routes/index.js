var express = require('express');
var router = express.Router();
var path = require('path');

// Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_walking_skeleton');

// Cat model tied to MongoDB
var Cat = mongoose.model('Cat', {name: String});

// Handle routes
router.post('/add', function(req, res, next){
    var kitty = new Cat({name: req.body.name});
    kitty.save(function(err){
        if(err) {
          console.log('meow %s', err);
        } else {
          console.log('added new cat! Meow!');
          res.send(kitty.toJSON());
        }
    });
});

router.get('/cats', function(req, res){
    Cat.find({}).exec(function(err, cats){
        if(err) {
          throw new Error(err);
        } else {
            res.send(JSON.stringify(cats));
        }
    });
});

// concatenate all cat names in our db and return as a long string
router.get('/conKitty', function(req, res) {
    var names = "";
    Cat.find({}).exec(function(err, list) {
        if(err) {
          throw new Error(err);
        } else {
          for(var i = 0; i < list.length; i++) {
              if(list[i].name) {
                  var thisName = list[i].name.replace(/ /gi, "-");

                  if(i == list.length - 1) {
                      // last
                      names += thisName;
                  } else {
                      names += thisName + "-";
                  }
              }
          }
          res.send(JSON.stringify(names));
        }
    });
});


router.get('/', function(req,res,next){
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});
//replace(/ /gi, "-");
module.exports = router;
