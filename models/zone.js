module.exports = (sequelize, DataType) => {
  return sequelize.define('zone', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataType.INTEGER,
      allowNull: false
    },
    latitude: {
      type: DataType.DOUBLE,
      allowNull: false
     },
    longitude: {
      type: DataType.DOUBLE,
      allowNull: false
    },
    radius: {
      type: DataType.DOUBLE,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
  });
}