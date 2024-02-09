const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList.toString());
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (contact) {
    return contact;
  }
  return null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (contact) {
    filterContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
    return contact;
  }
  return null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactObj = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  if (contacts.some((item) => item.name === contactObj.name)) {
    console.log("A contact with that name already exists");
    return;
  }
  const newContacts = [...contacts, contactObj];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contactObj;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
