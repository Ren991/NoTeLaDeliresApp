const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  expenses: [{
    month: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      default: 0
    }
  }]
});

module.exports = mongoose.model('Balance', balanceSchema);
