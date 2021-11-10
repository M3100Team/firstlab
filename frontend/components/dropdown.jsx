import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import clsx from 'clsx';

import styles from './dropdown.module.scss';

function Icon(props) {
  return <svg width="18" height="5" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.35112 0.0636708C0.834003 -0.130249 0.257591 0.131756 0.0636708 0.648877C-0.130249 1.166 0.131756 1.74241 0.648877 1.93633L1.35112 0.0636708ZM9 4L8.64888 4.93633C8.87526 5.02122 9.12474 5.02122 9.35112 4.93633L9 4ZM17.3511 1.93633C17.8682 1.74241 18.1302 1.166 17.9363 0.648877C17.7424 0.131756 17.166 -0.130249 16.6489 0.0636708L17.3511 1.93633ZM0.648877 1.93633L8.64888 4.93633L9.35112 3.06367L1.35112 0.0636708L0.648877 1.93633ZM9.35112 4.93633L17.3511 1.93633L16.6489 0.0636708L8.64888 3.06367L9.35112 4.93633Z" fill="#C0C0C0"/>
  </svg>;  
}

function Dropdown(props) {
  const [index, setIndex] = useState(props.index ?? 0);

  if (props.index && props.index !== index) {
    setIndex(props.index);
  }

  function handleChange(event) {
    setIndex(event.target.value);
    props.onChange?.(props.options[event.target.value], event.target.value);
  }

  return <>
    <FormControl variant="outlined" className={clsx(styles["form-control"], props.className)} id={clsx(props.id)} style={props.style}>
      <label className={styles["label"]}>{props.title}</label>
      <Select
        inputProps={{ "aria-label": "Without label", }}
        value={index}
        onChange={handleChange}
        classes={{ root: styles["select-root"], }}
        IconComponent={Icon}
        MenuProps={{ classes: { paper: styles["paper"], }, }}
      >
        {(props.options.length === 0 ? ["⠀"] : props.options).map((element, index) => 
          <MenuItem
            value={index}
            key={index}
            classes={{ selected: styles["selected-item"], }}
          >{element}</MenuItem>
        )}
      </Select>
    </FormControl>
  </>;
}

Dropdown.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func, // (newValue, index) => {}
  style: PropTypes.objectOf(PropTypes.string),
}

export default Dropdown;
