#!/bin/sh

cp -R ./demo .cache
git checkout gh-pages
mv ./.cache/demo/* .
rm demo.jsx
rm -rf .cache
git add .
git c 'update gh-pages'
git push
git checkout master
