const mongoose = require('mongoose');

const DataItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    rawContent: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    tags: [
      {
        type: String,
      },
    ],
    aiSummary: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DataItem', DataItemSchema);
