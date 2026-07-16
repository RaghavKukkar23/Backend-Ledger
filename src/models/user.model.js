const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    googleId: {
    type: String,
    default: null,
    },
    email: {
        type: String,
        required: [true, 'Email is required for creating a user'],
        trim: true,
        lowercase: true,
        matches: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
        unique: [true, 'Email already exists']
    },
    name: {
        type: String,
        required: [true, 'Name is required for creating a user'],
        trim: true
    },
    password: {
        type: String,
        required: function () {
        return !this.googleId;
        },
        // required: [true, 'Password is required for creating a user'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false, // Exclude password from query results by default
        default: null
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},{
    timestamps: true,
})

userSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
module.exports = User