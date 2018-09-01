module.exports = (sequelize, DataType) => {
    return sequelize.define('contact', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true, autoIncrement: true
        },
        user_id: {
            type: DataType.INTEGER, allowNull: false
        },
        name: {
            type: DataType.STRING, allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true
    });
};