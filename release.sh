#!/bin/sh

echo "Creating TAR.XZ..."
tar -cJvf releases/release.tar.xz background.webp index.html language.js LICENSE script.js style.css
echo "Creating ZIP..."
zip -j releases/release.zip background.webp index.html language.js LICENSE script.js style.css