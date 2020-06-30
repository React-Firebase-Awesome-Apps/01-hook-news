import React from "react";

function useFormValidation(initialState) {
  const [values, setValues] = React.useState(initialState);

  function handleChange(event) {
      event.persist()
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault(); // so page does not reload
    console.log("{values}", { values });
  }

  return { handleChange, handleSubmit, values };
}

export default useFormValidation;
