module.exports = (sequelize, DataType) => {
  return sequelize.define('user', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataType.STRING,
      allowNull: false
    },
    password: {
      type: DataType.STRING,
      allowNull: false
    },
    android_logined: {
      type: DataType.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
}