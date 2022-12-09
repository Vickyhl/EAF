import mongoose from "mongoose"

const grocerySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    groceryItems: [{
        name: { type: String, required: true},
        qty: { type: Number, required: true},
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }
    ],
    
 }, {
        timestamps: true
})

const Grocery = mongoose.model('Grocery', grocerySchema)

export default Grocery