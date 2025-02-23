import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import { useEffect } from "react";
import { selectError } from "./redux/contactsSlice";
import iziToast from "izitoast";

function App() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      iziToast.error({
        title: "Error",
        message: error,
        position: "topRight",
        timeout: 5000,
      });
    }
  }, [error]);

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </>
  );
}

export default App;
