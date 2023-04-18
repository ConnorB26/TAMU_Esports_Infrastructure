FROM node:19

WORKDIR /app

# Copy the custom variables and build script
COPY css/custom_lux_variables.scss css/
COPY build_custom_theme.sh .

# Set the build script as executable
RUN chmod +x build_custom_theme.sh

# Run the build script and create the bootswatch_complete file
CMD ["./build_custom_theme.sh"]
