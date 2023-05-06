const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.log('OH NO!List not found!', error);
    } 
};

const getContactById = async (contactId) => {
    try {
        const allContacts = await listContacts();
        const result = allContacts.find(contact => contact.id === contactId)
        return result || null;
    } catch (error) {
        console.error(error);
    }
};

const removeContact = async (contactId) => {
   try {
        const allContacts = await listContacts();
       const index = allContacts.findIndex(contact => contact.id === contactId);
       if (index === -1) {
           return null;
       };
       const [deletedContact] = allContacts.splice(index, 1);
       await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
       return deletedContact;
   } catch (error) {
        console.error(error);
   }
};

const addContact = async(data) => {
  try {
      const allContacts = await listContacts();
      const newContact = {
          id: nanoid(),
          ...data,
      };
      allContacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
      return newContact;
  } catch (error) {
      console.error(error);
  }
};

module.exports = { listContacts, getContactById, addContact, removeContact };