import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import "../App.css";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["",""],
  skills: [""],
};

const onSubmit = (values) => {
  console.log("Form Data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!!"),
  email: Yup.string().email("Invalid email format").required("Required!!"),
  channel: Yup.string().required("Required!!"),
  address: Yup.string().required("Required"),
});

const FormikComponentForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="form Formik-component">
        <div className="form-controls">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-controls">
          <label htmlFor="email">E-mail</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component={TextError} />
        </div>

        <div className="form-controls">
          <label htmlFor="channel">Channel</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" component={TextError} />
        </div>

        <div className="form-controls">
          <label htmlFor="comments">Comments</label>
          <Field as="textarea" id="comments" name="comments" />
          <ErrorMessage name="comments" component={TextError} />
        </div>

        <div className="form-controls">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("Render props", props, form);
              return (
                <>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter address"
                    {...field}
                    onBlur={field.onBlur}
                  />
                  {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                  ) : null}
                </>
              );
            }}
          </Field>
        </div>

        <div className="form-controls">
          <label htmlFor="facebook">Facebook profile</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>

        <div className="form-controls">
          <label htmlFor="facebook">Twitter profile</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>

        <div className="form-controls">
          <label htmlFor="PrimaryPhone">Primary Phone Number</label>
          <Field type="text" id="PrimaryPhone" name="phoneNumbers[0]" />
        </div>

        <div>
          <label htmlFor="SecondaryPhone">Secondary Phone Number</label>
          <Field type="text" id="SecondaryPhone" name="phoneNumbers[1]" />
        </div>

        <div className="form-controls">
          <label htmlFor="">List of Skills</label>
          <FieldArray name="skils">
            {
              (FieldArrayProps) => {
                console.log("FieldArrayProps", FieldArrayProps);
                const {push, remove, form} = FieldArrayProps;
                const {values} = form;
                const {skills} = values;
                return (
                  <div>
                    FieldArrayProps
                  </div>
                )
              }
            }
          </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikComponentForm;
