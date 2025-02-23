import { useDispatch, useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { deleteContact } from "../../redux/contactsOps";
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contactsSlice";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  if (error) {
    return <p className={css.error}>Error: {error}</p>;
  }

  if (isLoading && filteredContacts.length === 0) {
    return <p>Loading contacts...</p>;
  }

  return (
    <ul className={css.list}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onDelete={() => dispatch(deleteContact(contact.id))}
          />
        ))
      ) : (
        <p>No contacts found.</p>
      )}
    </ul>
  );
};

export default ContactList;
