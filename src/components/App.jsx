import { Component } from 'react';
import { nanoid } from 'nanoid'

import {Section} from './Section/Section'
import {Form} from './Form/Form'
import {ContactsList} from './User/ContactsList'
import {FilterByName} from './FilterByName/FilterByName'

export class App extends Component {
 
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  }


  componentDidUpdate (prevProps, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length){
      localStorage.setItem('contacts' , JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount () {
    const contacts = localStorage.getItem('contacts')
    const parseContacts = JSON.parse(contacts)

    if (parseContacts){
      this.setState({contacts: parseContacts})
    }
  }



  isContactInState = ({ name, number }) =>
  !!this.state.contacts.filter(({ name: prevName, number: prevNumber }) => {
    return prevName === name && prevNumber === number;
  }).length;

handleSubmitForm = ({ name, number }) => {
  if (this.isContactInState({ name, number })) {
    alert('Contact is in phonebook');
    return;
  }

  this.setState(({ contacts: prevContacts }) => ({
    contacts: [...prevContacts, { id: nanoid(), name, number }],
  }));
};





handleFilterChange = evt => {
  this.setState({ filter: evt.currentTarget.value });
};

filterNormalize = filter => filter.toLowerCase();

contactListToDisplay = (contacts, filter) =>
  contacts.filter(({ name }) => name.toLowerCase().includes(filter));

handleDeleteContact = id => {
  this.setState(({ contacts: prevContacts }) => ({
    contacts: prevContacts.filter(({ id: contactId }) => contactId !== id),
  }));
};

  render () {

    const { contacts, filter } = this.state;
const normalizedFilter = this.filterNormalize(filter);
const contactsToDisplay = this.contactListToDisplay(
  contacts,
  normalizedFilter
);
    
      return (
    <>
    <Section>
    <Form 
    onSubmitForm={this.handleSubmitForm}/>
    </Section>

    <Section>
    <FilterByName 
    filter ={filter}
    onChange={this.handleFilterChange}/>
    <ContactsList 
    contactList={contactsToDisplay}
    onDelete={this.handleDeleteContact}/> 
    </Section>
</>
  );
  };
};



