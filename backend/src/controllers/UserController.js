exports.getUsers = async (req, res, database) => {
  try {
    const users = await database.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};

exports.createUser = async (req, res, database) => {
  try {
    const newUser = await database.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a user.' });
  }
};

exports.updateUser = async (req, res, database) => {
  try {
    const updatedUser = await database.updateUserByEmail(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating a user.' });
  }
};

exports.deleteUser = async (req, res, database) => {
  try {
    await database.deleteUserByEmail(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting a user.' });
  }
};

exports.getUserByEmail = async (req, res, database) => {
  try {
    const user = await database.findUserByEmail(req.params.email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for a user by email.' });
  }
};