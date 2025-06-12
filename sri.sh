#!/bin/sh

echo "script.js:"
echo -n "sha256-" && sha256sum -b script.js | grep -o '^[0-9a-f]\+' | xxd -r -p | base64
echo "language.js:"
echo -n "sha256-" && sha256sum -b language.js | grep -o '^[0-9a-f]\+' | xxd -r -p | base64
echo "style.css:"
echo -n "sha256-" && sha256sum -b style.css | grep -o '^[0-9a-f]\+' | xxd -r -p | base64