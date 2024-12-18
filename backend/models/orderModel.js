const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, 
        imageurl: {type: String, required: true }
    }],
    shippingAddress: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        phone: {type: Number }
    },
    totalQuantity: { type:Number, required:true },
    amount: { type:Number, required:true }, 
    createdAt:{type: Date, default : Date.now}, // Timestamp for when the order was created
});

module.exports = mongoose.model('Order', OrderSchema);