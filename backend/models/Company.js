const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{
    companyName: {
        type: String,
        required: true
    },

    website: {
        type: String
    },

    sector: {
        type: String
    },

    contactEmail: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Company", companySchema);