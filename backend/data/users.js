import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'vikush40@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        gender: 'Female',
        health: true
    },
    {
        name: 'Yuval',
        email: 'yuvavi21@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        gender: 'Female',
        health: true
    },
    {
        name: 'Alex Veksler',
        email: 'vickyhl@ac.sce.il',
        password: bcrypt.hashSync('123456', 10),
        isDietitian: true,
        gender: 'Female',
        health: true
    },
]

export default users