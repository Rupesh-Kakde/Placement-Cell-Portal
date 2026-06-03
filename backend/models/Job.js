const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    skills: {
        type: [String],
        default: []
    },

    package: {
        type: Number
    },

    deadline: {
        type: Date
    },

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Job", jobSchema);