#!/bin/sh

cp -R ./demo .cache

rm .cache/demo.jsx
rm .cache/styles.css
cp src/styles.css .cache

git checkout gh-pages

mv ./.cache/* .
rm -rf .cache

# git add .
# git commit -m "Update demo page"
# git push
# git checkout master
