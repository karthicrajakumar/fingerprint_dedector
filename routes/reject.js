var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Requests = require('../app/models/requests');
var mongoose = require('mongoose');



router.get('/',function(req,res){
  var user = req.decoded;
  var post_id = req.query.req_id;
  Requests.remove({'_id':mongoose.Types.ObjectId(post_id)},function(err,doc){
    return res.json({success:true});
  });

})

module.exports = router;
