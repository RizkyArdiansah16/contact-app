const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

const { stdin: input, stdout: output } = require('node:process');

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}


const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp }
    // const file = fs.readFileSync('data/contacts.json', 'utf-8')
    // const contacts = JSON.parse(file)
    const contacts = loadContact()


    const duplikat = contacts.find((contact) => contact.nama === nama)
    if (duplikat) {
        console.log(chalk.red("Nama sudah terdaftar, Gunakan nama lain"))
        return false
    }

    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red('Maaf email anda tidak valid'))
            return false
        }
    }
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red('Maaf nomor hp anda tidak valid'))
        return false
    }

    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

    console.log(chalk.green('Terimakasih telah memasukkan data :)'))
}
const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.cyan.inverse.bold('Daftar Kontak : '))
    contacts.forEach((contact, i) => {
        console.log(chalk.cyan(`${i + 1}. ${contact.nama} - ${contact.noHp}`))
    })
}

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    if (!contact) {
        console.log(chalk.red(`${nama} tidak ditemukan`))
        return false
    }
    console.log(chalk.cyan(`Nama : ${contact.nama}`))
    console.log(chalk.cyan(`No. HP : ${contact.noHp}`))
    if (contact.email) {
        console.log(chalk.cyan(`Email : ${contact.email}`))
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

    if (contacts.length === newContacts.length) {
        console.log(chalk.red(`${nama} tidak ditemukan`))
        return false
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))

    console.log(chalk.green(`${nama} berhasil dihapus!`))

}
module.exports = { simpanContact, listContact, detailContact, deleteContact }