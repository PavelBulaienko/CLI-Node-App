const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "//db//contacts.json");
const shortid = require("shortid");

function listContacts() {
  return fs
    .readFile(contactsPath)
    .then((data) => data.toString())
    .catch((err) => console.log(err.message));
}

async function getContactById(contactId) {
  const allContacts = JSON.parse(await listContacts());

  return allContacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const allContacts = JSON.parse(await listContacts());
  const newContacts = allContacts.filter((contact) => contact.id !== contactId);

  console.log("Contact was deleted!");
  return fs.writeFile(contactsPath, JSON.stringify(newContacts));
}

async function addContact(name, email, phone) {
  const allContacts = JSON.parse(await listContacts());
  const newContact = {
    id: shortid.generate(),
    name: name,
    email: email,
    phone: phone,
  };

  allContacts.push(newContact);
  console.log(`You add new contact: ${JSON.stringify(newContact)}!`);

  return fs.writeFile(contactsPath, JSON.stringify(allContacts));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
