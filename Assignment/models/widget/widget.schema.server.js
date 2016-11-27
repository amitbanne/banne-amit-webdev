module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
        //type
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: String,
        size: String,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: Date
    },{collection:"widgets"});
    return WidgetSchema;
};