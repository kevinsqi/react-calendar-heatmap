#!/bin/sh

cp -R ./demo .cache
git checkout gh-pages
mv ./.cache/demo/* .
rm demo.jsx
rm -rf .cache
git add .
git commit -m "Update demo page"
git push
git checkout master
