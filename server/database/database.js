const { Sequelize, Op} = require('sequelize')
const { Model, DataTypes } = require('sequelize')
const {initModels} = require("./models");
// const {memoryWords} = require("./engine");
const {RECIPE} = require("./models")

// console.log(process.env.DATABASE_URL)

require('dotenv').config()

let sequelize

// console.log(process.env.DATABASE_URL)

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

module.exports.sequelize = sequelize

try {
    module.exports.sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully')
    })
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

// TODO
let force = false
module.exports.sequelize.sync({force: force}).then(async () => {
    console.log('DB SYNC')
})

let saveLike = async (recipe) => {
    recipe.likes = 1
    RECIPE.findOrCreate({where: {id: recipe.id}}).then(function(dbRecipe) {
        let recipeObject = dbRecipe[0].dataValues
        if (recipeObject) {
            recipeObject.likes = recipeObject.likes + 1
            RECIPE.update(recipeObject, {where: {id: recipe.id}})
        }
    })
}

let getLikes = async (limit = '1000', order = 'createdAt') => {
    return await RECIPE.findAll({
        order: [
            [order, 'DESC'],
        ],
        limit: parseInt(limit),
    })
}

// let getUser = async (uuid) => {
//     let user = USER.findOne({where: {uuid: uuid}})
//     return user
// }
//
// let saveUser = async (user) => {
//     // let dbUser = await USER.findOrCreate({
//     //     where: { uuid: user.uuid },
//     //     user
//     // })
//     // return dbUser
// }
//
// let updateUser = async (user) => {
//     USER.findOrCreate({where: {uuid: user.uuid}, user}).then(function(dbUser) {
//         if (dbUser)
//             USER.update(user, {where: {uuid: user.uuid}})
//         // else
//         //     saveUser(user).then()
//     })
// }
//
// let getLogs = async (limit = '1000', order = 'createdAt') => {
//
//     return await LOG.findAll({
//         order: [
//             [order, 'DESC'],
//         ],
//         limit: parseInt(limit),
//     })
// }
//
// let saveLog = async (log) => {
//     // console.log(log)
//     await LOG.create(log)
// }
//
// let getFeedbacks = async (limit = '1000', order = 'createdAt') => {
//
//     return await FEEDBACK.findAll({
//         order: [
//             [order, 'DESC'],
//         ],
//         limit: parseInt(limit),
//     })
// }
//
// let saveFeedback = async (feedback) => {
//     console.log(feedback)
//     await FEEDBACK.create(feedback)
// }
//
// let getSupports = async (limit = '1000', order = 'createdAt') => {
//
//     return await SUPPORT.findAll({
//         order: [
//             [order, 'DESC'],
//         ],
//         limit: parseInt(limit),
//     })
// }
//
// let saveSupport = async (support) => {
//     console.log(support)
//     await SUPPORT.create(support)
// }
//
// let getWords = async (limit = '1000', order = 'createdAt') => {
//
//     return await WORDS.findAll({
//         order: [
//             [order, 'DESC'],
//         ],
//         limit: parseInt(limit),
//     })
// }
//
// let saveWords = async (words) => {
//     console.log(words)
//     await WORDS.create(words)
// }

module.exports = {
    saveLike, getLikes
}

initModels(sequelize)