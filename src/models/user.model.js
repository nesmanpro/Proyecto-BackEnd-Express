import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: String,

    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    password: String,

    age: Number,

    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },

    role: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default: 'user'
    },

    resetToken: {
        token: String,
        expiresAt: Date
    },

    documents: [{
        name: String,
        reference: String
    }],

    last_connection: {
        type: Date,
        default: Date.now
    }

});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;