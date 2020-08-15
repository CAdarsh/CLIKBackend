let mongoose = require("mongoose");
let validator = require("validator");

let AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: data => {
            if(!validator.isEmail(data)){
                throw new Error("Not a valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [{
        token: {
            type: String
        }
    }
    ]

})

module.exports = mongoose.model("Admin",AdminSchema);