const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(JSON.parse(await listContacts()));
      break;

    case "get":
      console.log(await getContactById(id));
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
