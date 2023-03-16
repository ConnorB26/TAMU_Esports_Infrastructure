const createDatabaseInstance  = require('./database/database.js');
const db = createDatabaseInstance(false);

(async () => {
    try {
      // Define the data for the new user
      const newUser = {
        email: 'john.doe@tamu.edu',
        name: 'John Doe',
        discordId: '1234567890',
      };
  
      // Call the addDocument function and pass the newUser object
      const savedUser = await db.addDocument(newUser);
  
      // Log the saved user object
      console.log('User saved:', savedUser);
    } catch (error) {
      // Handle any errors during the save process
      console.error('Error saving user:', error);
    }
  })();