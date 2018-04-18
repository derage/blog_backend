#!/usr/bin/env bash -eo pipefail

SLS_DEBUG=* sls invoke test --region us-east-1 --stage $1 