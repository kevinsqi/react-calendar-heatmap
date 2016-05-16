#!/bin/sh

cp -R ./demo .cache
cp src/styles.css .cache
git checkout gh-pages
mv ./.cache/* .
rm demo.jsx
rm -rf .cache
git add .
git commit -m "Update demo page"
git push
git checkout master
