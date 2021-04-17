const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/]
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
  {
    toJSON: {
      // include virtuals
      virtuals: true,
    },
    // this is a virtual and we don't need an id
    id: false
  }
);

// virtual that retrieves the length of a user's friends array
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// creates a User model using the UserSchema
const User = model('User', UserSchema);

// exports the User model 
module.exports = User;
