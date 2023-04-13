# Change the directory to the path where the Bootswatch repository is cloned
Set-Location -Path .\bootswatch_custom

# Pull the latest changes from the Bootswatch repository
git pull

# Store the paths to the original and custom _variables.scss files
$ORIGINAL_VARIABLES = "dist\lux\_variables.scss"
$CUSTOM_VARIABLES = "..\frontend\src\assets\css\custom_lux_variables.scss"
$BACKUP_VARIABLES = "dist\lux\_variables_original.scss"

# Backup the original _variables.scss file
Copy-Item -Path $ORIGINAL_VARIABLES -Destination $BACKUP_VARIABLES

# Replace the original _variables.scss with your custom one
Copy-Item -Path $CUSTOM_VARIABLES -Destination $ORIGINAL_VARIABLES

# Build the custom theme using npx
npx grunt swatch:lux

# Copy the built theme to your desired location
Copy-Item -Path "dist\lux\bootstrap.css" -Destination "..\frontend\src\assets\css\custom-lux.css"
Copy-Item -Path "dist\lux\bootstrap.min.css" -Destination "..\frontend\src\assets\css\custom-lux.min.css"

# Restore the original _variables.scss file
Move-Item -Path $BACKUP_VARIABLES -Destination $ORIGINAL_VARIABLES -Force

# Go back to the root of your project
Set-Location -Path ..
