// Migrácia databázy pre Railway
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Modely
const User = require('./models/User');
const Content = require('./models/Content');
const Tag = require('./models/Tag');
const Widget = require('./models/Widget');
const AISuggestion = require('./models/AISuggestion');

// Inicializácia Sequelize s pripojením k databáze
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Inicializácia modelov
const models = {
  User: User(sequelize),
  Content: Content(sequelize),
  Tag: Tag(sequelize),
  Widget: Widget(sequelize),
  AISuggestion: AISuggestion(sequelize)
};

// Definícia vzťahov medzi modelmi
models.User.hasMany(models.Content, { foreignKey: 'createdBy' });
models.Content.belongsTo(models.User, { foreignKey: 'createdBy' });

models.User.hasMany(models.Widget, { foreignKey: 'userId' });
models.Widget.belongsTo(models.User, { foreignKey: 'userId' });

// Funkcia pre migráciu databázy
async function migrateDatabase() {
  try {
    // Testovanie pripojenia
    await sequelize.authenticate();
    console.log('Pripojenie k databáze úspešné.');

    // Synchronizácia modelov s databázou
    await sequelize.sync({ force: true });
    console.log('Databáza úspešne migrovaná.');

    // Vytvorenie admin používateľa
    await models.User.create({
      name: 'Admin',
      email: 'admin@architekt-kuziel.sk',
      password: '$2a$10$XFPUqK7yMiMxoR.klIgB8eP/Z1kxS3lNl5g5yZ7.FMn0oo.rFf3Hy', // heslo: admin123
      role: 'admin'
    });
    console.log('Admin používateľ vytvorený.');

    // Vytvorenie základných tagov
    const tags = [
      { name: 'marketing', category: 'business', count: 0 },
      { name: 'development', category: 'tech', count: 0 },
      { name: 'design', category: 'creative', count: 0 },
      { name: 'analytics', category: 'business', count: 0 },
      { name: 'content', category: 'creative', count: 0 }
    ];

    for (const tag of tags) {
      await models.Tag.create(tag);
    }
    console.log('Základné tagy vytvorené.');

    console.log('Migrácia databázy úspešne dokončená.');
  } catch (error) {
    console.error('Chyba pri migrácii databázy:', error);
  } finally {
    await sequelize.close();
  }
}

// Spustenie migrácie
migrateDatabase();
