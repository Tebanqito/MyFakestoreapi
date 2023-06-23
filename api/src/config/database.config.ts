import { Sequelize } from "sequelize-typescript";
// import { User } from "../store/models/User";
// import { Product } from "../store/models/Product";
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fackestoreapi`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

const db = new Sequelize(`postgres://postgres:admin@localhost:5432/fackestoreapi`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  models: [__dirname + '/models/**/*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

db.addModels([__dirname + '../models/User.ts']);
db.addModels([__dirname + '../models/Product.ts']);

// User.associate({ Product });
// Product.associate({ User });

// User.hasMany(Product, {
//   sourceKey: 'id',
//   foreignKey: 'ownerId',
//   as: 'products' // this determines the name in `associations`!
// });
// Product.belongsTo(User, { targetKey: 'id' });

export default db;