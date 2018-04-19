#!/usr/bin/env node

const db = require('../models');


var fs = require('fs');
var posts = JSON.parse(fs.readFileSync('./models/data/posts.json', 'utf8')).posts;

db.BlogPost.model.create(posts, function (err, acccounts) {
  if(err){
    console.log('error creating posts in database', err);
    process.exit(1)
  } else {
      console.log('Created posts in database');
      process.exit();
  }
});