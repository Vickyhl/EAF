import mongoose from "mongoose"

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true},
    ingredients: { type: String, required: true},
    fat: { type: String, required: true},
    carbs: { type: String, required: true},
    protein: { type: String, required: true}
},)

const menuSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    carbs: {
        type: Number,
        required: true,
        default: 0
    },
    protein: {
        type: Number,
        required: true,
        default: 0
    },
    fat: {
        type: Number,
        required: true,
        default: 0
    },
    products: [ProductSchema],
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    meal1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    meal2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    meal3: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    meal4: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
    meal5: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    }
 }, {
        timestamps: true
})

const Menu = mongoose.model('Menu', menuSchema)

export default Menu