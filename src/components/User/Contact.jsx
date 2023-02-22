import { PropTypes } from 'prop-types';
import css from './Contact.module.css';

export const Contact = ({ contact: { id, name, number }, onDelete }) => {
    
  const handleClick = () => onDelete(id);

  return (
   <li className={css.listItem}>
      <p className={css.title}>
        {name}: {number}
      </p>
      <button className={css.addButton} type="button" onClick={handleClick}>
        Delete
      </button>
    </li>
  
  );
};

Contact.propTypes ={
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  onDelete: PropTypes.func.isRequired
}

