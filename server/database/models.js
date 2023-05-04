// lang domain
const {DataTypes, Model} = require('sequelize');

class ITEM extends Model {}
class MAP_ITEM extends Model {}
class UNIT extends Model {}
class MAP_UNIT extends Model {}
class USER extends Model {}

let initModels = (sequelize) => {

    ITEM.init({

        name: { // 'pine'
            type: DataTypes.STRING,
            primaryKey: true,
        },
        type: { // 'tree'
            type: DataTypes.STRING,
            primaryKey: true,
        },
        produce: { // 'seed'
            type: DataTypes.STRING,
            primaryKey: true,
        },

    }, { sequelize, modelName: 'item', timestamps: true })

    MAP_ITEM.init({
        x: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        y: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: { // 'pine'
            type: DataTypes.STRING,
        },
        type: { // 'tree'
            type: DataTypes.STRING,
        },
        level: { // 0'
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        user: { // 'username'
            type: DataTypes.STRING,
        },
        // Array
        items: {
            type: DataTypes.JSONB,
        },
    }, { sequelize, modelName: 'map_item', timestamps: true })
}

module.exports = {
    ITEM, MAP_ITEM, initModels
}