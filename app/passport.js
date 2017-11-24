var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    }
});
module.exports = mongoose.model('passport', userSchema);

