// lang domain
const {DataTypes, Model} = require("sequelize");

class MAP_ITEM extends Model {}

let initModels = (sequelize) => {

    MAP_ITEM.init({
        x: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        y: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        // Array
        items: {
            type: DataTypes.JSONB,
        },
    }, { sequelize, modelName: 'recipe', timestamps: true })
}

module.exports = {
    MAP_ITEM, initModels
}