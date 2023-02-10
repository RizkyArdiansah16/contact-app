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
    .demandCommand()

// menampilkan semua daftar nama kontak
yargs.command({
    command: 'list', describe: 'Menampilkan data kontak', handler() {
        contact.listContact()
    }
})

// menampilkan detail kontak
yargs.command({
    command: 'detail', describe: 'Menampilkan detail kontak berdasarkan nama', builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
    }, handler(argv) {
        contact.detailContact(argv.nama)
    }
})


// Menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete', describe: 'Menghapus kontak berdasarkan nama', builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
        },
    }, handler(argv) {
        contact.deleteContact(argv.nama)
    }
})

yargs.parse()









