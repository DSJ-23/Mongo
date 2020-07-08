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

subscriberSchema.methods.testing = function() {
  console.log('hello')
  return this
}



module.exports = mongoose.model('Subscriber', subscriberSchema);