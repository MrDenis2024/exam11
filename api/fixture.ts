import mongoose from 'mongoose';
import config from './config';
import User from './models/User';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const firstUser = new User({
    username: 'User1',
    password: '123',
  });
  firstUser.generateToken();
  await firstUser.save();

  const secondUser = new User({
    username: 'User2',
    password: '345',
  });
  secondUser.generateToken();
  await secondUser.save();

  await db.close();
};

run().catch(console.error);