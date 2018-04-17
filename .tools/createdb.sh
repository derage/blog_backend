#!/usr/bin/env

const db = require('../models')
db.dynamo.createTables(function(err) {
            if (err) {
              console.log('Error creating tables: ', err);
            } else {
              console.log('Tables has been created');
            }
            exit 0;
          });