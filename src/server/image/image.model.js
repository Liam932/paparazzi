const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: 'string',
    data: 'string',
});
module.exports = mongoose.model('Image', schema);
