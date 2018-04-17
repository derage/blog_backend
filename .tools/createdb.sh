#!/usr/bin/env node

const db = require('../models');

db.dynamo.createTables(function(err) {
            if (err) {
              console.log('Error creating tables: ', err);
              process.exit(1);
            } else {
              console.log('Tables has been created');
              process.exit();
            }
            process.exit(1);
          });