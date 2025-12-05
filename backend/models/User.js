const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    profileImageUrl: {
        type: String, default: null
    }
}, { timestamps: true });

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;