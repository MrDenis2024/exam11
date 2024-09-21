import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Category from './models/Category';
import Product from './models/Product';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [tv, refrigerators, washing , teapots,] = await Category.create({
    title: 'TVs',
  }, {
    title: 'Refrigerators',
  }, {
    title: 'Washing machines',
  }, {
    title: 'Teapots',
  });

  const firstUser = new User({
    username: 'Denis',
    password: '123',
    name: 'I.E. Denis',
    phone: 996999809123,
  });
  firstUser.generateToken();
  await firstUser.save();

  const secondUser = new User({
    username: 'Anton',
    password: '345',
    name: 'I.E. Anton',
    phone: 996999812123,
  });
  secondUser.generateToken();
  await secondUser.save();

  await Product.create({
    user: firstUser,
    category: tv,
    title: 'OLED телевизор Haier 65 S9 Pro',
    description: 'Диагональ экрана 65-165,1 см. Разрешение 3840х2160. Технология OLED',
    image: 'fixtures/tv.jpeg',
    price: 182000
  }, {
    user: firstUser,
    category: teapots,
    title: 'Чайник Tefal BJ551B10',
    description: 'Материал корпуса: Стекло. Мощность 1430 Вт. Объём: 1.5л',
    image: 'fixtures/teapot.jpeg',
    price: 10000,
  }, {
    user: secondUser,
    category: refrigerators,
    title: 'Холодильник Samsung RB33A32N0SA/WT',
    description: 'Тип холодильника: С нижней холодильной камерой. Общий объем 350л. Высота: 185 см',
    image: 'fixtures/refreg.jpeg',
    price: 44000,
  }, {
    user: secondUser,
    category: tv,
    title: 'LED телевизор Haier 65 S2',
    description: 'Диагональ экрана 65-165,1 см. Разрешение 3840х2160. Технология LED',
    image: 'fixtures/secondtv.jpeg',
    price: 68000,
  });

  await db.close();
};

run().catch(console.error);