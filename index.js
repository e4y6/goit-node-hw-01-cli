const contacts = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      console.table(contactList);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      console.table(oneContact);
      break;

    case "add":
      const contactToAdd = await contacts.addContact(name, email, phone);
      console.table(contactToAdd);
      break;

    case "remove":
      const contactToRemove = await contacts.removeContact(id);
      console.table(contactToRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async function () {
  await invokeAction(argv);
})();
