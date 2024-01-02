# [Texas A&M Esports Infrastructure](https://tamuesports.com/)

Welcome to the technical infrastructure for Texas A&M Esports. This project encompasses a comprehensive system to support the Esports community at Texas A&M, integrating a series of technologies to streamline and enhance the user experience.

### Project Structure Overview

The infrastructure is designed in a layered approach to ensure scalability, maintainability, and optimal performance:

1. **Database**: The core data storage powered by AWS-hosted Postgres.
2. **Backend**: Developed using Nest JS (TypeScript), this layer facilitates the business logic and interaction with the database.
3. **Discord Bot**: Written in TypeScript, it interfaces with the backend, providing automation for membership management and integrations with Google Scripts and Flywire.
4. **Frontend**: Crafted with React (TypeScript), it provides the visual interface for end-users, sourcing content from the CMS.

This structure ensures a clear separation of concerns while maintaining cohesiveness across the platform.
