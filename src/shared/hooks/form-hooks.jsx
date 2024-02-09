import React, { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.id) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        inputs: {
          ...state.inputs,
          [action.id]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    }
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

const useForm = (initialInputs, initialFormValidity) => {
  const initialState = {
    inputs: initialInputs,
    isValid: initialFormValidity,
  };

  const [formState, dispatchValidator] = useReducer(formReducer, initialState);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatchValidator({ type: "INPUT_CHANGE", id, value, isValid });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatchValidator({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};

export default useForm;
