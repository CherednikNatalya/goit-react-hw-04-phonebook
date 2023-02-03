import { Component } from 'react';
import { nanoid } from 'nanoid'
import css from './Form.module.css';
import { PropTypes } from 'prop-types';

export class Form extends Component {
  state = {
    name: '',
    number: ''
  }

  nameId = nanoid()
  numberId = nanoid()

  handleChangeInfo = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

    handleSubmit = event => {
        event.preventDefault()
        const { name, number } = this.state;
        this.props.onSubmitForm({ name, number });
        this.setState({name:'', number:''})
    }

    render () {
      const { name, number } = this.state;
        // const { onChange } = this.props;
        
        return(
<form onSubmit={this.handleSubmit}>
    <h2>Phonebook</h2>
    <div className="mb-3">
          <label htmlFor={this.nameId} className={css.labelStyle}>
            <p>Name</p>
          </label>
        <input
        className={css.inputStyle}
        id={this.nameId}
  type="text"
  name="name"
  value={name}
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
  onChange={this.handleChangeInfo}
/>
</div>

<div className="mb-3">
          <label htmlFor={this.numberId} className={css.labelStyle}>
            <p>Number</p>
          </label>
        <input
        id={this.numberId}
        type="tel"
  value={number}
  name="number"
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
  onChange={this.handleChangeInfo}
/>
</div>

<button className={css.addButton} type="submit" >
          Add contact
        </button>
</form>
        )
    }
}


Form.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
}




