import React from "react";
import {
  Formik,
  Form,
  Field,
  FastField,
  ErrorMessage,
  FieldArray,
} from "formik";
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
  phoneNumbers: ["", ""],
  skills: [""],
  hobbies: [""],
  educationField: [""],
};

const onSubmit = (values) => {
  console.log("Form Data", values);
};

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!!"),
  email: Yup.string().email("Invalid email format").required("Required!!"),
  channel: Yup.string().required("Required!!"),
  address: Yup.string().required("Required"),
});

const FormikComponentRenderProps = () => {
  console.log("File rerendered");
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false} //to prevent validation while entering data onChange.
      validateOnBlur={false} //to prevent validation on Blur event like clicking somewhere else in the page.
    >
      {(formik) => {
        console.log(formik);
        return (
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
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-controls">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  // console.log("Render props", props, form);
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
              </FastField>
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
              <FieldArray name="skills">
                {(FieldArrayProps) => {
                  // console.log("FieldArrayProps", FieldArrayProps);
                  const { push, remove, form } = FieldArrayProps;
                  const { values } = form;
                  const { skills } = values;
                  // console.log("skills", skills);
                  return (
                    <div>
                      {skills.map((skill, index) => {
                        return (
                          <div key={index}>
                            <Field name={`skills[${index}]`} />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                            <button type="button" onClick={() => push("")}>
                              +
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <div className="form-controls">
              <label htmlFor="">List of Hobbies</label>
              <FieldArray name="hobbies">
                {(hobbieArraysProps) => {
                  // console.log("FieldArrayProps", hobbieArraysProps);
                  const { push, remove, form } = hobbieArraysProps;
                  const { values } = form;
                  const { hobbies } = values;
                  // console.log("hobbies", hobbies);
                  return (
                    <div>
                      <h3>Hobbies</h3>
                      {hobbies.map((_, index) => (
                        <div key={index} className="hobbie-field">
                          <Field
                            type="text"
                            name={`hobbies[${index}]`}
                            placeholder="Enter Hobbies"
                          />
                          {/* Remove button (if more than 1 phone number exists) */}
                          {hobbies.length > 1 && (
                            <button type="button" onClick={() => remove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Add phone number button */}
                      <button type="button" onClick={() => push("")}>
                        Add Hobby
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <div className="form-controls">
              <label htmlFor="">List of educations</label>
              <FieldArray name="educationField">
                {({ push, remove, form }) => {
                  const { values, setFieldValue } = form;
                  const { educationField } = values;
                  // console.log("educationField", educationField);

                  return (
                    <div>
                      <h3>educationField</h3>

                      {/* Display hobbies as divs */}
                      {educationField.map((education, index) => (
                        <div key={index} className="educationField">
                          <span>{education}</span>{" "}
                          {/* Show hobby value inside a span */}
                          {education.length > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Input field to add new hobby */}
                      <Field
                        name="newEducation"
                        placeholder="Enter education"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // console.log("setFieldValue", setFieldValue, values);
                          const newEducation = values.newEducation.trim();
                          if (newEducation) {
                            push(newEducation); // Add hobby to the array
                            setFieldValue("newEducation", ""); // Clear input after adding
                          }
                        }}
                      >
                        Add Education
                      </button>
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* Manually Triggering Validations through buttons*/}
            <button
              type="button"
              onClick={() => {
                formik.validateField("comments");
              }}
            >
              validate comments
            </button>
            <button
              type="button"
              onClick={() => {
                formik.validateForm();
              }}
            >
              validate all
            </button>
            <button
              type="button"
              onClick={() => {
                formik.setFieldTouched("comments");
              }}
            >
              visit comments
            </button>
            <button
              type="button"
              onClick={() => {
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                });
              }}
            >
              visit all
            </button>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikComponentRenderProps;
