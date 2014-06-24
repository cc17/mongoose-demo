var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//database connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bear');

var Bear = require('./models/bear');

app.use(bodyParser());


var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req,res,next){
  console.log('Something is happening.');
  next();
});

router.route('/bears')
  .post(function(req,res){
    console.log(req.body,'req.body');
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err){
      if(err){
        res.send(err);
      }
      res.json({message:'Bear created'});
    });
  })
  .get(function(req,res){
    Bear.find(function(err,bears){
      if(err){
        res.send(err);
      }
      res.json(bears);
    });
  });


//REGISTER OUR ROUTERS
//all of our routers will be prefixed with /api
app.use('/api',router);

app.listen(port,function(){
  console.log('Magic happens on port ' + port);
});