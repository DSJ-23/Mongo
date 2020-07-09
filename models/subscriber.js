const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

// subscriberSchema.methods.testing = function(something) {
//   console.log(something)
//   return something
// }



module.exports = mongoose.model('subscriber', subscriberSchema);