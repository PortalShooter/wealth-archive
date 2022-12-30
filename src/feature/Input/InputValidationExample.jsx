import React from 'react';

// Components
import { Input } from '@/feature/Input';

const customValidation = [
  (text) => {
    return {
      check: reg.test(text),
      message: 'Please enter a valid email address',
    };
  },
  // (text) => ({
  //   check: text.length > 5,
  //   message: 'Need more 5',
  // }),
  // (text) => ({
  //   check: text.length > 7,
  //   message: 'Need more 7',
  // }),
];

function InputValidationExample(props) {
  return <Input validation={customValidation} {...props} />;
}

export default InputValidationExample;
