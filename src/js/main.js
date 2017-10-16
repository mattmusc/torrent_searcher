const _ = require("lodash");
const $ = require("jquery");

import "font-awesome/css/font-awesome.css";
import "../css/style.scss";

$(document).ready(function() {
    var searchBtnId = "#searchBtn",
        searchInputId = "#searchInput",
        resultDivId = "#resultDiv",

    searchTorrent = function(string, category, success) {
        $.getJSON("http://localhost:3000/search/" + category + "/" + string, function(data) {
            if ( success && typeof success === 'function' ) {
                success( data );
            }
        });
    };

    $(searchBtnId).on("click", function() {
        var value = $(searchInputId).val();
        if ( value ) {
            searchTorrent(value, "movies", function(data) {
                var tpl = _.template('<h1></h1>');
            });
        }
    });
});