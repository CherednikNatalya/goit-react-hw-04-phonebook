import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

import {Section} from './Section/Section'
import {Form} from './Form/Form'
import {ContactsList} from './User/ContactsList'
import {FilterByName} from './FilterByName/FilterByName'

export const  App =() => {
 const [name, setName] = useState('')
 const [number, setNumber] = useState('')
 const [filter, setFilter] = useState('')
 const [contacts, setContacts] = useState(()=> {
  return JSON.parse(localStorage.getItem('contacts')) || []})


  // const firstRender = useRef(true);
 
  useEffect (()=>{
    localStorage.setItem('contacts' , JSON.stringify(contacts))
  },[contacts])


  const isContactInState = () =>
  !!contacts.filter(() => {return name === setName && number === setNumber;}).length;
console.log(isContactInState())

const handleSubmitForm = (name, number) => {
  const contact = {
    id: nanoid(),
    name,
    number,
  };
  setContacts(contacts => {
    const includeName = contacts.find(user => user.name === contact.name);
    if (includeName) {
      alert(`${contact.name} is already in contacs`);
      return [...contacts];
    } else {
      return [contact, ...contacts];
    }
  });

  // if (isContactInState( name, number )) {
  //   alert('Contact is in phonebook');
  //   return;
  // }

  // setContacts(({ contacts: prevContacts }) => ({
  //   contacts: [...contacts, { id: nanoid(), name, number }],
  // }));
};


const handleFilterChange = evt => {
  setFilter(evt.currentTarget.value);
};

// const filterNormalize = filter => filter.toLowerCase();

// const contactListToDisplay = (contacts, filter) =>
//  { contacts.filter(({ name }) => name.toLowerCase().includes(filter))};

// const contactsToDisplay = contactListToDisplay(
//       contacts,
//       filterNormalize(filter));


const filterContacts = contacts.filter(contact =>
contact.name.toLowerCase().includes(filter.toLowerCase())
);      

const handleDeleteContact = id => {
  setContacts(prev => {
    const newContactList = prev.filter(contact =>contact.id !==id)
  return [...newContactList]
  });
};



//     const { contacts, filter } = this.state;
// const normalizedFilter = this.filterNormalize(filter);
// const contactsToDisplay = this.contactListToDisplay(
//   contacts,
//   filterNormalize(filter)
// );
    
      return (
    <>
    <Section>
    <Form 
    onSubmitForm={handleSubmitForm}/>
    </Section>

    <Section>
    <FilterByName 
    filter ={filter}
    onChange={handleFilterChange}
    />
    <ContactsList 
  contacts={filterContacts}
   onDelete={handleDeleteContact}/> 
    </Section>
</>
  );
  };













  

  // export const App = () => {
  //   const [contacts, setContacts] = useState(
  //     () =>
  //       JSON.parse(localStorage.getItem('contactsData')) ?? [
  //         { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //         { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //         { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //         { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //       ]
  //   );
  //   const [filter, setFilter] = useState('');
  //   const firstRender = useRef(true);
  
  //   useEffect(() => {
  //     if (firstRender.current) {
  //       firstRender.current = false;
  //       console.log('Первый рендер');
  //       return;
  //     }
  //     localStorage.setItem('contactsData', JSON.stringify(contacts));
  //     console.log('Второй рендер ');
  //   }, [contacts]);
  
  //   const onSubmiHandler = (name, number) => {
  //     const contact = {
  //       id: nanoid(),
  //       name,
  //       number,
  //     };
  //     setContacts(contacts => {
  //       const includeName = contacts.find(user => user.name === contact.name);
  //       if (includeName) {
  //         alert(`${contact.name} is already in contacs`);
  //         return [...contacts];
  //       } else {
  //         return [contact, ...contacts];
  //       }
  //     });
  //   };
  
  //   const handelChange = e => {
  //     const { value } = e.target;
  //     setFilter(value);
  //   };
  
  //   const handleDelete = id => {
  //     setContacts(prevState => {
  //       const newContactList = prevState.filter(contact => contact.id !== id);
  //       console.log(newContactList);
  
  //       return [...newContactList];
  //     });
  //   };
  
  //   const filterContacts = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );
  //   return (
  //     <>
  //       <h1>Phonebook</h1>
  //       <Form onSubmit={onSubmiHandler} />
  
  //       <h2>Contacts</h2>
  //       <Filter value={filter} onChange={handelChange} />
  //       <Contacts contacts={filterContacts} onDelete={handleDelete} />
  //     </>
  //   );
  // };