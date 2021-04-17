const { Schema, model } = require('mongoose');


const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: 'Please share your reaction!',
      max: 280
    },
    username: {
      type: String,
      required: 'Please provide a username'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //get: (createdAtVal) => dateFormat(createdAtVal)
    }
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Please share your thoughts!',
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //get: (createdAtVal) = dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: 'Please provide a username.'
    },
    // subdocument created with the ReactionSchema
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      // include virtuals
      virtuals: true,
      // include getters
      getters: true
    }
  }
);


// virtual that retrieves the length of a thought's reactions array
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// creates the Thoughts model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// exports the Thoughts model 
module.exports = Thought;