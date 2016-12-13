module.exports = function () {
    var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
        // I DO NOT NEED ENUM HERE for widget type. 
        // I create a dummy widget in my client controller based on the widget type selected by user in widget-choose, and then ask the user to update the details. 
        // Hence, it is impossible for any other widget type to be created.
        // In this assignment, only HTML, HEADER, IMAGE, YOUTUBE, TEXT(i.e. INPUT) are the widget types that come into picture. 
        // No other widget types can be encountered. Hence, I have not used the enum.
        type: String, 
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
