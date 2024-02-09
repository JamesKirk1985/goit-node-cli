const contactsFunc = module.require("./contacts.js");

const { program } = module.require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsFunc
        .listContacts()
        .then((data) => console.table(data))
        .catch((err) => console.log(err.message));
      break;

    case "get":
      contactsFunc
        .getContactById(id)
        .then((data) => console.log(data))
        .catch((err) => console.log(err.message));
      break;

    case "add":
      contactsFunc
        .addContact(name, email, phone)
        .then((data) => console.log(data))
        .catch((err) => console.log(err.message));

      break;

    case "remove":
      contactsFunc
        .removeContact(id)
        .then((data) => console.log(data))
        .catch((err) => console.log(err.message));

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
