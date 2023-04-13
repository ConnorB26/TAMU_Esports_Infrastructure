#!/bin/bash

# Change the directory to the path where the Bootswatch repository is cloned
cd bootswatch_custom

# Pull the latest changes from the Bootswatch repository
git pull

# Store the paths to the original and custom _variables.scss files
ORIGINAL_VARIABLES="dist/lux/_variables.scss"
CUSTOM_VARIABLES="../frontend/src/assets/css/custom_lux_variables.scss"
BACKUP_VARIABLES="dist/lux/_variables_original.scss"

# Backup the original _variables.scss file
cp "$ORIGINAL_VARIABLES" "$BACKUP_VARIABLES"

# Replace the original _variables.scss with your custom one
cp "$CUSTOM_VARIABLES" "$ORIGINAL_VARIABLES"

# Build the custom theme using npx
npx grunt swatch:lux

# Copy the built theme to your desired location
cp "dist/lux/bootstrap.css" "../frontend/src/assets/css/custom-lux.css"
cp "dist/lux/bootstrap.min.css" "../frontend/src/assets/css/custom-lux.min.css"

# Restore the original _variables.scss file
mv "$BACKUP_VARIABLES" "$ORIGINAL_VARIABLES"

# Go back to the root of your project
cd ..