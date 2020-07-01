import React from "react";

function useFormValidation(initialState, validate, authenticate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log("authenticated");
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    event.persist(); // so we don't get undefined!
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  function handleSubmit(event) {
    setSubmitting(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);

    event.preventDefault(); // so page does not reload
    console.log("handleSubmit {values}", { values });
  }

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting
  };
}

export default useFormValidation;
