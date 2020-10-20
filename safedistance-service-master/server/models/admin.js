const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AdminSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  activateStatus:{
    type:Boolean,
    default:false
  },
  salt:{
    type: String
  }
})
export default mongoose.model('admins', AdminSchema);
