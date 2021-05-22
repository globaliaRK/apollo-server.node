const Mongoose = require('mongoose');

const con = Mongoose.connect("mongodb://localhost:27017/apollographql", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
module.exports = con;