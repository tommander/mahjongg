#!/bin/bash

SCRIPTJS=`echo -n "sha256-" && sha256sum -b script.js | grep -o '^[0-9a-f]\+' | xxd -r -p | base64`
LANGJS=`echo -n "sha256-" && sha256sum -b language.js | grep -o '^[0-9a-f]\+' | xxd -r -p | base64`
STYLECSS=`echo -n "sha256-" && sha256sum -b style.css | grep -o '^[0-9a-f]\+' | xxd -r -p | base64`

cat dev.html | sed "s|src=\"script.js\"|src=\"script.js\" integrity=\"$SCRIPTJS\"| ; s|src=\"language.js\"|src=\"language.js\" integrity=\"$LANGJS\"| ; s|href=\"style.css\"|href=\"style.css\" integrity=\"$STYLECSS\"|" - > index.html