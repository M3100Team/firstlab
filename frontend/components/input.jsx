import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './input.module.scss';

const Input = forwardRef((props, ref) => {
  const [focused, setFocused] = useState(false);

  return <div className={clsx(styles["input-container"], props.className, focused && styles.focused, props.error && styles["error"])}>
    <div className={styles["input-header-container"]}>
      <span className={styles["input-title"]}>{props.title}</span>
      <span className={styles["input-error"]}>{props.error}</span>
    </div>
    <input
      ref={Object.keys(ref).length === 0 ? null : ref}
      type={props.type ?? "text"}
      placeholder={props.placeholder}
      maxLength={props.maxLength ?? 256}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      spellCheck={false}
      defaultValue={props.defaultValue}
      onInput={event => {
        props.onInput?.(event);
      }}
    />
  </div>
})

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  defaultValue: PropTypes.string,
  onInput: PropTypes.func,
}

export default Input;
