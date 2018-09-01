module.exports = (sequelize, DataType) => {
  return sequelize.define('disconnect_contact', {
    contact_id: {
      type: DataType.INTEGER,
      primaryKey: true,
    },
    zone_id: {
      type: DataType.INTEGER,
      primaryKey: true,
    }
  }, {
    timestamps: false,
    underscored: true,
  });
}