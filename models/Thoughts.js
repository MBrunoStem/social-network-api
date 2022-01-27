const { Schema, model } = require('mongoose');
const moment = require('moment');

const thoughtsSchema = new Schema(
  {
  thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
      type: String,
      required: true
  },
  reactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Reactions'
}],
  },
  {
  toJSON: {
      virtuals: true,
      getters: true
  },
  id: false
  }
);

thoughtsSchema.virtual('Reactions').get(function (){
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;