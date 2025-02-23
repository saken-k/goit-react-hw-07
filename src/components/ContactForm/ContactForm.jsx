import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm();
  };

  const onlyLetters = /^[A-Za-zА-Яа-яЄєІіЇїҐґ-\s]+$/;
  const phoneNumber = /^\d{3}-\d{3}-\d{4}$/;

  const applySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required")
      .matches(onlyLetters, "Only letters"),
    number: Yup.string()
      .matches(phoneNumber, "Format: 123-456-7890")
      .required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={applySchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field
              className={css.field}
              name="name"
              type="text"
              placeholder="John Smith"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </label>
          <label className={css.label}>
            Number
            <Field
              className={css.field}
              name="number"
              type="phone"
              placeholder="123-456-7890"
            />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </label>
          <button className={css.btn} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};
export default ContactForm;
