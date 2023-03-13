import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contactList')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contactList', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const handleSubmit = evt => {
    const id = nanoid();
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
      contactsList.push({ id, name, number });
    }

    setContacts(contactsList);
  };

  const handleDelete = evt => {
    setContacts(contacts.filter(contact => contact.id !== evt))
  }

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase())
    })
    return filterContactsList;
  }

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
      <Filter filter={filter} handleChange={handleChange} />
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

// export class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     name: '',
//     number: '',
//   };

//   componentDidMount() {
//     const localStorageSavedContacts = localStorage.getItem('contactList');
//     const parsedContacts = JSON.parse(localStorageSavedContacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const prevStateContacts = prevState.contacts;
//     const nexStateContacts = this.state.contacts;

//     if (prevStateContacts !== nexStateContacts) {
//       localStorage.setItem('contactList', JSON.stringify(nexStateContacts));
//     }
//   }

//   handleChange = evt => {
//     const { name, value } = evt.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = evt => {
//     const id = nanoid();
//     const name = evt.name;
//     const number = evt.number;
//     const contactsList = [...this.state.contacts];

//     if (contactsList.findIndex(contact => name === contact.name) !== -1) {
//       toast.warn(`${name} is already in contacts.`, {
//         position: 'top-right',
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//       });
//     } else {
//       contactsList.push({ id, name, number });
//     }
//     this.setState({ contacts: contactsList });
//   };

//   handleDelete = evt => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== evt),
//     }));
//   };

//   getFilteredContacts = () => {
//     const filterContactsList = this.state.contacts.filter(contact => {
//       return contact.name
//         .toLowerCase()
//         .includes(this.state.filter.toLowerCase());
//     });

//     return filterContactsList;
//   };

//   render() {
//     const { filter } = this.state;

//     return (
//       <div>
//         <h1
//           style={{
//             fontSize: 'xx-large',
//             textAlign: 'center',
//             marginTop: '90px',
//           }}
//         >
//           Phonebook
//         </h1>
//         <ContactForm handleSubmit={this.handleSubmit} />
//         <h2
//           style={{
//             textAlign: 'center',
//             fontSize: 'x-large',
//             marginTop: '5px',
//           }}
//         >
//           Contacts
//         </h2>
//         <Filter filter={filter} handleChange={this.handleChange} />
//         <ContactList
//           contacts={this.getFilteredContacts()}
//           handleDelete={this.handleDelete}
//         />
//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover={false}
//           theme="light"
//         />
//       </div>
//     );
//   }
// }
