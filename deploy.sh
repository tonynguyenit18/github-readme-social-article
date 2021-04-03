#!/bin/bash
git branch -D deploy
git push origin --delete deploy
git checkout -b deploy
yarn build
cp -R dist/ ./
git add .
git commit -m "deploy"
git push --set-upstream origin deploy
git checkout main