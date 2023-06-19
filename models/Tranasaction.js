const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    publicAddress: {
        type: String
    },
    mgp: {
        type: String
    },
    amount: {
        type: String
    },
    hashKey: {
        type: String
    }
}, {timestamps: true}
)

module.exports = mongoose.model("Transaction", TransactionSchema)