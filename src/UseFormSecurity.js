import { useState, useEffect } from "react";

const UseFormSecurity = (callback, validate) => {
  const [values, setValues] = useState({
    question1: "",
    answer1: "",
    question2: "",
    answer2: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changeHandler = (e) => {
    console.log(`hello im here`);
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    console.log(values);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { changeHandler, submitHandler, values, errors };
};

export default UseFormSecurity;
