var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Requests = require('../app/models/requests');
var mongoose = require('mongoose');

router.get('/',function(req,res){
  var user = req.query.uname;
  var user_id = req.decoded;

  Requests.find({done:false},function(err,docs){

    User.findOne({'_id':mongoose.Types.ObjectId(user_id)},function(err,user){
      if(docs.length == 0)
      {
        return res.json({success:false,result:docs,amount:user.amount});
      }
        return res.json({success:true,result:docs,amount:user.amount});
    });

  });
});

router.post('/',function(req,res){

    var user_id = req.decoded;




    var requests = new Requests({
  		from : req.body.from,
      amount :req.body.amount,
      to:req.body.to,
      title:req.body.title
  	});
    requests.save(function(err){
  if(err){
        return res.json({success:false,message:"Unknown Error"})
    }

    return res.json({success: true,message:"Request Posted Successfully" });
  });

});
module.exports = router;
