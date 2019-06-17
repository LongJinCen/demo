#!/bin/sh

cd /Users/longjincen/Desktop/code/demo/blog1-mooc/logs

cp access.log $(date + %Y-%m-%d).access.log

echo "" > access.log