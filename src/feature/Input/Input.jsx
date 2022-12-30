import React, { useEffect, useRef, useState } from 'react';

// Styles
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cn = classNames.bind(styles);

function Input({
  placeholder,
  validation = [],
  onChange = null,
  inputClassName,
  inputRef,
  value: initialValue = '',
  ...props
}) {
  const [value, setValue] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  //const inputRef = useRef(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleInput = (ev) => {
    if (!isActive) {
      setIsActive(true);
    }
    const newValue = ev.target.value;
    setValue(newValue);

    let errMessage = '';

    validation.length &&
      validation.forEach((validate) => {
        if (errMessage) {
          return;
        }

        const { check, message = '' } = validate(newValue);

        if (!check) {
          errMessage = message;
        }
      });

    setError(errMessage);

    if (!errMessage && onChange) {
      onChange(newValue);
    }
  };
  return (
    <div
      className={cn(
        'input',
        { input_active: isActive },
        { input_filled: value.length > 0 },
        { input_error: error.length > 0 }
      )}
    >
      <input
        {...props}
        className={cn('input__input', inputClassName)}
        value={value}
        ref={inputRef}
        onInput={handleInput}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {error && <div className={cn('input__error-msg')}>{error}</div>}
    </div>
  );
}

export default Input;
