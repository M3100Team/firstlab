import { createRef, useEffect, useState } from "react";
import clsx from "clsx";

import styles from './inputForm.module.scss';

import Input from "./input";

export default function InputForm(props) {
  const [state, setState] = useState({ content: [], refs: {}, });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let content = [];
    let refs = {};
    for (const [key, value] of Object.entries(props.inputs)) {
      const currentRef = createRef();
      refs[key] = currentRef;
      content.push(<Input {...value} ref={currentRef} key={key} error={errors[key]} onInput={() => {
        if (errors[key]) {
          let newErrors = { ...errors, };
          newErrors[key] = null;
          setErrors(newErrors);
        }
      }} />)
    }
    setState({ content: content, refs: refs, });
  }, [errors]);

  function submit(event) {
    event.preventDefault();

    let result = {};
    for (const [key, ref] of Object.entries(state.refs)) {
      if (ref.current.value === "") {
        ref.current.focus();
        return;
      }
      result[key] = ref.current.value;
    }

    const response = props.onSubmit(result);
    /* response: { status: ["ok", "error"], details: { fieldName: errorText, }, } */
    if (response?.status === "ok") {
      for (const [key, ref] of Object.entries(state.refs)) {
        ref.current.value = "";
      }
      document.activeElement.blur();
      setErrors({});

      props.onSuccess?.();
    } else if (response?.status === "error") {
      let newErrors = {};
      for (const [key, error] of Object.entries(response.details)) {
        newErrors[key] = error;
      }
      setErrors(newErrors);

      props.onFailure?.();
    }
  }

  return <form className={clsx(styles["form"], props.className)} onSubmit={submit}>
    {state.content}
    {props.children?.(submit) /* Accepts submit button as a child only */}
    <input type="submit" style={{ visibility: "hidden", display: "none", }} />
  </form>;
}
