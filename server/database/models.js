// lang domain
const {DataTypes, Model} = require("sequelize");

class RECIPE extends Model {}

let initModels = (sequelize) => {

    RECIPE.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        likes: {
            type: DataTypes.INTEGER,
        },
        data: {
            type: DataTypes.JSONB,
        },
    }, { sequelize, modelName: 'recipe', timestamps: true })
}

module.exports = {
    RECIPE, initModels
}