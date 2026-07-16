const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        index: true,
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
        index: true,
    },
    status:{
        type: String,
        enum: {
            values: ['PENDING', 'COMPLETED', 'FAILED','REVERSED'],
            message: 'Status must be either PENDING, COMPLETED, FAILED or REVERSED',
        },
        default: 'PENDING',
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    idempotencyKey: {
        type: String,
        required: [true, 'Idempotency key is required'],
        unique: true,
        index: true,
    },
},{
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;