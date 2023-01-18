const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (!validator.isAlphanumeric(value)) {
                throw new Error("Enter a valid username");
            }
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter a valid email address");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
});

sellerSchema.virtual("items", {
    ref: "item",
    localField: "_id",
    foreignField: "postedBy",
});

sellerSchema.methods.generateAuthToken = async function () {
    const seller = this;
    const token = jwt.sign({
        _id: seller._id.toString()
    }, "code");
    seller.tokens = seller.tokens.concat({
        token
    });
    await seller.save();
    return token;
};

sellerSchema.statics.findByCredentials = async (username, password) => {
    const seller = await Seller.findOne({
        username
    });
    if (!seller) {
        throw new Error("Invalid Username!");
    }
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
        throw new Error("Invalid Password!");
    }
    return seller;
};

sellerSchema.pre("save", async function (next) {
    const seller = this;
    if (seller.isModified("password")) {
        seller.password = await bcrypt.hash(seller.password, 8);
    }
    next();
});

const Seller = mongoose.model("seller", sellerSchema);
module.exports = Seller;