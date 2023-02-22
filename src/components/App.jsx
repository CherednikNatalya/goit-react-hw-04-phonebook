import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid'

import {Section} from './Section/Section'
import {Form} from './Form/Form'
import {ContactsList} from './User/ContactsList'
import {FilterByName} from './FilterByName/FilterByName'



  export const App =() => {
    const [filter, setFilter] = useState('')
    const [contacts, setContacts] = useState(()=> {
     return JSON.parse(localStorage.getItem('contacts')) || []})
  
     const firstRender = useRef(true);

     useEffect (()=>{
      if (firstRender.current) {
        firstRender.current = false;
        console.log('Первый рендер');
        return;
      }
      localStorage.setItem('contacts' , JSON.stringify(contacts))
    },[contacts])


    const onSubmiHandler = (name, number) => {
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
    };
  
    const handelChange = e => {
      const { value } = e.target;
      setFilter(value);
    };
  
    const handleDelete = id => {
      setContacts(prevState => {
        const newContactList = prevState.filter(contact => contact.id !== id);
        console.log(newContactList);
  
        return [...newContactList];
      });
    };
  
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  
  
  
      
        return (
      <>
      <Section>
      <Form 
      onSubmitForm={onSubmiHandler}/>
      </Section>
  
      <Section>
      <FilterByName 
      filter ={filter}
      onChange={handelChange}/>
      <ContactsList 
      contactList={filterContacts}
      onDelete={handleDelete}/> 
      </Section>
  </>
    );
    };
   









  