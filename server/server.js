'use strict';

var express = require('express');
var app = express();

var TorrentSearchApi = require('torrent-search-api');
var torrentSearch = new TorrentSearchApi();

var enabledProviders = ['1337x', 'Torrent9', 'ThePirateBay', 'Torrentz2', 'TorrentProject'];
enabledProviders.forEach(function (provider) {
    try {
        torrentSearch.enableProvider(provider);
    } catch (err) {
        console.error(err);
    }
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getActiveProviders', function (req, res) {
    res.send(torrentSearch.getActiveProviders());
});

app.get('/search/:category/:terms', function (req, res) {
    var cate = req.params["category"];
    var term = req.params["terms"];
    torrentSearch.search(term, cate, 20).then(function (torrents) {
        res.send(torrents);
    }).catch(function (err) {
        res.send(err);
    });
});

app.get('/', function (req, res) {
    res.send("hello from torrent search server!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
