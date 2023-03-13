import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { getContacts, getFilter } from 'redux/selectors';
import { useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (first) {
      JSON.parse(window.localStorage.getItem('contactList'));
      setFirst(false);
    } else {
      window.localStorage.setItem('contactList', JSON.stringify(contacts));
    }
  }, [contacts, first]);

  const handleSubmit = evt => {
    const name = evt.name;
    const number = evt.number;
    const contactsList = [...contacts];
    if (contactsList.findIndex(contact => name === contact.name) !== -1) {
      toast.warn(`${name} is already in contacts.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      dispatch(addContact(name, number));
    }
  };

  const handleDelete = evt => {
    dispatch(deleteContact(evt));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filterContactsList;
  };

  return (
    <div>
      <h1
        style={{
          fontSize: 'xx-large',
          textAlign: 'center',
          marginTop: '90px',
        }}
      >
        Phonebook
      </h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2
        style={{
          textAlign: 'center',
          fontSize: 'x-large',
          marginTop: '5px',
        }}
      >
        Contacts
      </h2>
      <Filter />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={handleDelete}
      />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};
