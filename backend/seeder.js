// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import colors from 'colors'
// import users from './data/users.js'
// import User from './models/userModel.js'
// import grocery from './models/groceryModel.js'
// import Menu from './models/menuModel.js'
// import connectDB from './config/db.js'
// import express from 'express'

// dotenv.config()

// connectDB()

// const app = express()

// app.use((req, res, next) =>{
//     console.log('HELLO')
//     next()
// })

// const importData = async () => {
//     try {
//         await User.deleteMany()
//         await grocery.deleteMany()
//         await Menu.deleteMany()

//         const createdUsers = await User.insertMany(users)

//         const adminUser = createdUsers[0]._id

//         const sampleProducts = products.map(product => {
//             return { ...product, user:adminUser }
//         })

//         await Product.insertMany(sampleProducts)

//         console.log('Data Imported!'.green.inverse)
//         process.exit()

//     } catch (error) {
//         console.error(`${error}`.red.inverse)
//         process.exit(1)
//     }
// }

// const destroyData = async () => {
//     try {
//         await User.deleteMany()
//         await grocery.deleteMany()
//         await Menu.deleteMany()

//         console.log('Data Destroyed!'.red.inverse)
//         process.exit()

//     } catch (error) {
//         console.error(`${error}`.red.inverse)
//         process.exit(1)
//     }
// }

// if(process.argv[2] === '-d'){
//     destroyData()
// }
// else {
//     importData()
// }
