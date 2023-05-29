import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ContactForm-styled.css';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    addContact({ name, number });

    setName('');
    setNumber('');
  };

  const handleAddContact = contact => {
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="Form-styled">
      <label className="Label__form__styled">
        Name
        <input
          type="text"
          name="name"
          className="Input__form__styled"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className="Label__form__styled">
        Number
        <input
          type="tel"
          name="number"
          className="Input__form__styled"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter number"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        className="Form__btn__styled"
        onClick={() => handleAddContact({ name, number })}
      >
        Add contact
      </button>
    </form>
  );
};
ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
