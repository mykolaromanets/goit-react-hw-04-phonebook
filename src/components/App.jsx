// import React, { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
// import { Section } from './Section/Section';
// import { ContactForm } from './ContactForm/ContactForm';
// import { ContactList } from './ContactList/ContactList';
// import { Filter } from './Filter/Filter';

// export const App = () => {
//   const [contacts, setContacts] = useState([
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);

//   const [filter, setFilter] = useState('');

//   const addContact = data => {
//     const newContact = {
//       id: nanoid(),
//       ...data,
//     };

//     const existingContact = contacts.some(
//       contact => contact.name === data.name
//     );

//     if (existingContact) {
//       alert(`${data.name} is already in contacts`);
//     } else {
//       setContacts(prevContacts => [...prevContacts, newContact]);
//     }
//   };

//   useEffect(() => {
//     const savedContacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(savedContacts);
//     parsedContacts && setContacts(parsedContacts);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   const deleteContact = userId => {
//     setContacts(prevContacts =>
//       prevContacts.filter(contact => contact.id !== userId)
//     );
//   };

//   const handleChangeFilter = e => {
//     setFilter(e.currentTarget.value);
//   };

//   const getFilterContacts = () => {
//     const filterLowerCase = filter.toLowerCase();
//     return contacts.filter(({ name }) =>
//       name.toLowerCase().includes(filterLowerCase)
//     );
//   };

//   return (
//     <>
//       <Section title="Phonebook">
//         <ContactForm addContact={addContact} />
//       </Section>
//       <Section title="Contacts">
//         <Filter value={filter} handleChangeFilter={handleChangeFilter} />
//         <ContactList
//           contacts={getFilterContacts()}
//           deleteContact={deleteContact}
//         />
//       </Section>
//     </>
//   );
// };
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
export function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    if (contacts.some(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = userId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== userId)
    );
  };

  const handleChangeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFilterContacts = () => {
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterLowerCase)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />

        <ContactList
          contacts={getFilterContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
}
