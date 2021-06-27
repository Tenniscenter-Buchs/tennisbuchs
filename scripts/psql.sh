#!/bin/bash
psql -Atx $(heroku config -a tennisbuchs-staging | grep DATABASE_URL | awk '{ print $2 }')
