import { Sequelize } from "sequelize";
import { User } from "../store/models/User";
import { Product } from "../store/models/Product";
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fackestoreapi`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// User.associate({ Product });
// Product.associate({ User });

User.hasMany(Product, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'products' // this determines the name in `associations`!
});
Product.belongsTo(User, { targetKey: 'id' });

export default db;