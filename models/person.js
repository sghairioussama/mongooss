const mongoose = require('mongoose');


const schema = mongoose.Schema
const personSchema= new schema({
    name: {
        type: String,
        required: true
    },
    age: Number ,

    favoriteFoods : [{
        type: String,
    }]

})
module.exports = connect = mongoose.model('person', personSchema)