const mongoose = require("mongoose")

function validateName(e) {
    let namePattern = /^[a-zA-Z\s-]+$/;
    return namePattern.test(e)
}

function validateEmail(e) {
    let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return EmailPattern.test(e)
}

function validatePassword(e) {
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordPattern.test(e)
}

let userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            validate: { validator: validateName, message: "Enter valid name" }
        },
        email: {
            type: String,
            required: true,
            minlength: 8,
            validate: { validator: validateEmail, message: "Enter valid email" }
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
            validate: {
                validator: validatePassword,
                message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            }
        }
    },
    { collection: "users", versionKey: false }
);

let UserModel = mongoose.model("users", userSchema)

module.exports = UserModel
