#!/usr/bin/env bash
pnpm add -D vue vuepress@next @vuepress/bundler-vite@next @vuepress/theme-default@next @vuepress/client@next @vuepress/utils@next
pnpm add -D @vuepress/plugin-shiki@next

repo=$(dirname "$PWD")

d=$repo/src/docs
f=$d/.vuepress/config.ts

cd $repo/documents

l=$(grep -n LANGS $f | grep -o ^[0-9]*)
for i in *.md
do
  grep -E '^`{3,}[a-zA-Z]{1,}' $i
done | tr -d '\r' | tr -d '`' | sort -u | while read i
do
  sed -i "$l i\'$i'," $f
done

mv index.md $d
for i in pro link
do
  mkdir $d/$i && mv $i.md $d/$i/index.md
done

find | while read i
do
  touch -d $(git log -1 --format=@%ct $i) $i
done

c=$(grep -n CONTENTS $f | grep -o ^[0-9]*)
for i in $(ls -tr)
do
  i=$(basename $i .md)
  sed -i "$c i\'/$i/'," $f
  mkdir $d/$i && mv $i.md $d/$i/index.md
done
