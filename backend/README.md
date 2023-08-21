# Discord Bot API

This API is designed to manage settings and user data for a Discord bot.

## Routes

### /discord_settings

- `GET /discord_settings` - Retrieves all discord settings.
- `GET /discord_settings/:id` - Retrieves a discord setting by its ID.
- `POST /discord_settings` - Creates a new discord setting. Accepts JSON body with `guildId`, `roleId`, `channelId` fields.
- `PUT /discord_settings/:id` - Updates a discord setting. Accepts JSON body with `guildId`, `roleId`, `channelId` fields.
- `DELETE /discord_settings/:id` - Deletes a discord setting by its ID.

### /confirmation_codes

- `GET /confirmation_codes` - Retrieves all confirmation codes.
- `GET /confirmation_codes/:code` - Retrieves a confirmation code by its code.
- `POST /confirmation_codes` - Creates a new confirmation code. Accepts JSON body with `code` and `claimed` fields.
- `PUT /confirmation_codes/:code` - Updates a confirmation code. Accepts JSON body with `code` and `claimed` fields.
- `DELETE /confirmation_codes/:code` - Deletes a confirmation code by its code.

### /roles

- `GET /roles` - Retrieves all roles.
- `GET /roles/:id` - Retrieves a role by its ID.
- `POST /roles` - Creates a new role. Accepts JSON body with `roleName` and `permissions` fields.
- `PUT /roles/:id` - Updates a role. Accepts JSON body with `roleName` and `permissions` fields.
- `DELETE /roles/:id` - Deletes a role by its ID.

### /user_codes

- `GET /user_codes` - Retrieves all user codes.
- `GET /user_codes/:discordId/:code` - Retrieves a user code by its discordId and code.
- `POST /user_codes` - Creates a new user code. Accepts JSON body with `discordId` and `code` fields.
- `PUT /user_codes/:discordId/:code` - Updates a user code. Accepts JSON body with `discordId` and `code` fields.
- `DELETE /user_codes/:discordId/:code` - Deletes a user code by its discordId and code.

### /user_roles

- `GET /user_roles` - Retrieves all user roles.
- `GET /user_roles/:discordId/:roleId` - Retrieves a user role by its discordId and roleId.
- `POST /user_roles` - Creates a new user role. Accepts JSON body with `discordId` and `roleId` fields.
- `PUT /user_roles/:discordId/:roleId` - Updates a user role. Accepts JSON body with `discordId` and `roleId` fields.
- `DELETE /user_roles/:discordId/:roleId` - Deletes a user role by its discordId and roleId.

### /users

- `GET /users` - Retrieves all users.
- `GET /users/:discordId` - Retrieves a user by its discordId.
- `POST /users` - Creates a new user. Accepts JSON body with `discordId` and `hasPaidDues` fields.
- `PUT /users/:discordId` - Updates a user. Accepts JSON body with `discordId` and `hasPaidDues` fields.
- `DELETE /users/:discordId` - Deletes a user by its discordId.

These routes are used to manage data for the Discord bot and provide a robust set of operations for CRUD (create, read, update, delete) operations.
