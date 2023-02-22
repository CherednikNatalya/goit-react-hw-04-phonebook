import { Contact } from './Contact';
import css from './ContactsList.module.css';
import { PropTypes } from 'prop-types';


export const ContactsList =({contactList, onDelete}) => {
    return(
        <div className={css.formStyle}>
            <h2 className={css.title}>Contacts</h2>
            {contactList &&(<ul className={css.contactsList}>
              
    {contactList.map(item => (
      <Contact key={item.id} contact={item} onDelete={onDelete} />
    ))}
  </ul>)}
        </div>
    )
  }

ContactsList.propTypes ={
  contactList: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired})  
  ),
   onDelete: PropTypes.func.isRequired
}










 