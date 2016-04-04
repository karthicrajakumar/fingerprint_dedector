var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var RequestsSchema = new Schema({
  from:{type:String},
  amount:{type:String},
  to:{type:String},
  title:{type:String},
  done:{type:Boolean,default:false}
});

module.exports = mongoose.model('Requests',RequestsSchema);
