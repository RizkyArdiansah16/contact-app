const yargs = require("yargs");
const contact = require("./contacts");

yargs.command({
    command: 'add', describe: 'Menambahkan kontak baru', builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Email",
            demandOption: false,
            type: "string",
        },
        noHp: {
            describe: "Nomor HP",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contact.simpanContact(argv.nama, argv.email, argv.noHp)
    }
})

// menampilkan semua daftar nama kontak
yargs.command({
    command: 'list', describe: 'Menampilkan data kontak', handler() {
        contact.listContact()
    }
})

yargs.parse()









