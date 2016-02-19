function enable_multiple_view_folders() {
    var View = require("../../node_modules/express/lib/view"), lookup_proxy = View.prototype.lookup;
    View.prototype.lookup = function (viewName) {
        var context, match;
        if (this.root instanceof Array) {
            for (var i = 0; i < this.root.length; i++) {
                context = { root: this.root[i] };
                match = lookup_proxy.call(context, viewName);
                if (match) {
                    return match;
                }
            }
            return null;
        }
        return lookup_proxy.call(this, viewName);
    };
}
enable_multiple_view_folders();
