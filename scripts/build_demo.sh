#!/bin/sh

cd demo
webpack -p
mkdir ../build_demo
cp *.css *.html demo.build.js ../build_demo
