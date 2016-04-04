var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Requests = require('../app/models/requests');
var mongoose = require('mongoose');
process.env.TZ = 'Asia/Kolkata';
router.post('/',function(req,res){

  var user_id = req.decoded;
  var user_hash = req.body.hash;
  var post_id = req.body.req_id;
  var mac;
  var add;
  var date = new Date();
  console.log(date);
  var current_min = date.getMinutes();

  User.find({_id:mongoose.Types.ObjectId(user_id)},function(err,docs){

      mac = docs[0].mac;
      var add  =""+current_min+mac;
      var md5 = require('md5');

      var hash = md5(add);

      if(user_hash === hash){
        Requests.findOne({'_id':mongoose.Types.ObjectId(post_id)},function(err,doc){
          doc.done = true;
          doc.save();
          User.findOne({'username':doc.from},function(err,user){
            if(user!=null)
            {  user.amount  = parseInt(doc.amount)+ parseInt(user.amount);
              user.save();

            }


          });
          User.findOne({'username':doc.to},function(err,user){
            if(user!= null)
            {
              user.amount = parseInt(user.amount)-parseInt(doc.amount);
              user.save();

            }

          });
        });

        return res.json({success:true});

      }
      else{
          return res.json({success:false});

      }
  });




});
router.get('/',function(req,res){
  var date = new Date();
  console.log(date);
});


module.exports = router;
