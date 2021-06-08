'use strict';
var LinesObj = require('./LinesObj');
var express = require('express');
var router = express.Router();

var root;
var currentStory;

/*
 * Renders the index page.
 */
router.get('/', function(req, res, next) {
    if (!root) root = new LinesObj("First sentance of the story.")
    currentStory = root;
    return res.render('index', { currentStory: root });
});

/*
Create Story
 */
router.post('/submitStory', function(req, res) {
    let story = req.body.story;
    let layout = req.body.layout;
    let newStory = new LinesObj(story);
    currentStory.addPath(newStory, layout);
    return res.render('index', { currentStory: currentStory });
});

/*
View Story
 */
router.post('/queryPath', function(req, res) {
    let layout = req.body.layout;
    currentStory = currentStory.getPath(layout);
    return res.render('index', { currentStory: currentStory });
});

module.exports = router;
