#!/bin/sh
set -e

ASSETS_DIR="/usr/share/nginx/html/assets"
TEMPLATE_FILE="$ASSETS_DIR/environment.template.json"
OUTPUT_FILE="$ASSETS_DIR/environment.json"
VARS_FILE="$ASSETS_DIR/environment.envsubst.vars"

# The whitelist of variables to substitute is generated from
# tools/environment.manifest.mjs (npm run generate-env) so it never drifts.
envsubst "$(cat "$VARS_FILE")" < "$TEMPLATE_FILE" > "$OUTPUT_FILE"

echo "environment.json generado desde environment.template.json"

nginx -g "daemon off;"
