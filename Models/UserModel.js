const Database = require("./Database");


const all = async () => {

    const row = await Database.query('SELECT * FROM `users`');
    return row;
    
}
const getById = async (id) => {

    const row = await Database.query('SELECT * FROM `users` WHERE id = ?', [id]);
    return row;
    
}

const add = async (payload) => {

    const row =  Database.query('INSERT INTO `users` (name,email,password) values (?,?,?)', [payload.name, payload.email, payload.password])
    return row;
}

const unique = async (column, value) => {
    const row =  Database.query(`select ${column} from users where email='${value}' `)
    return row;
}

module.exports = {
    all,
    getById,
    add,
    unique
}