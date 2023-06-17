import { Sequelize } from 'sequelize';
import { User } from '../store/models/User';
import { Product } from '../store/models/Product';

const db = new Sequelize('app', '', '', {
	storage: './database.sqlite',
	dialect: 'sqlite',
	logging: false,
});

User.hasMany(Product);
Product.belongsTo(Product);

export default db;