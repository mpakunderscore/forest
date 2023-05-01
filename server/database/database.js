const { Sequelize, Op} = require('sequelize')
const { Model, DataTypes } = require('sequelize')
const {initModels} = require("./models");
// const {memoryWords} = require("./engine");
const {MAP} = require("./models")

// console.log(process.env.DATABASE_URL)

require('dotenv').config()

let sequelize

// console.log(process.env.DATABASE_URL)

const initDatabase = () => {

    // Init
    try {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false,
        })
    } catch (e) {
        console.log(e)
    }

    // Auth
    try {
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully')
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }

    // Sync
    let force = false
    sequelize.sync({force: force}).then(async () => {
        console.log('DB SYNC')
    })

    // Models
    initModels(sequelize)
}

let getMap = async (limit = '10000', order = 'createdAt') => {
    return await MAP.findAll({
        order: [
            [order, 'DESC'],
        ],
        limit: parseInt(limit),
    })
}

// module.exports.sequelize = sequelize

// let saveLike = async (recipe) => {
//     recipe.likes = 1
//     RECIPE.findOrCreate({where: {id: recipe.id}}).then(function(dbRecipe) {
//         let recipeObject = dbRecipe[0].dataValues
//         if (recipeObject) {
//             recipeObject.likes = recipeObject.likes + 1
//             RECIPE.update(recipeObject, {where: {id: recipe.id}})
//         }
//     })
// }
//
// let getLikes = async (limit = '1000', order = 'createdAt') => {
//     return await RECIPE.findAll({
//         order: [
//             [order, 'DESC'],
//         ],
//         limit: parseInt(limit),
//     })
// }

module.exports = {
    getMap, initDatabase
}