#!/usr/bin/env bash

SLS_DEBUG=* sls invoke test --region us-east-1 --stage $1 
