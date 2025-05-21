const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AISuggestion = sequelize.define('AISuggestion', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    relatedContentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Contents',
        key: 'id'
      }
    }
  });

  return AISuggestion;
};
