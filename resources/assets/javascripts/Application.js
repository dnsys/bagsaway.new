//VENDORS
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');
require('jquery-nice-select');

class Application{
    constructor(){
        this._langSwitcher();
        this._searchComponent();
    }

    _langSwitcher(){
        $('select.lang-switch-select').niceSelect();
    }

    _searchComponent(){
        $('select.search-select').niceSelect();
    }
}

new Application();
