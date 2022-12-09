import mongoose from 'mongoose'


const productSchema = mongoose.Schema(
    {
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Menu',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    },
    {
    timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product