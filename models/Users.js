const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thoughts'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'Users'
  }],
},
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false
  }
);

const Users = model('Users', userSchema);

module.exports = Users;
