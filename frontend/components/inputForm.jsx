import React, { createRef, useState } from "react";
import clsx from "clsx";

import styles from './inputForm.module.scss';

export default function InputForm(props) {
  const [errors, setErrors] = useState(props.errors ?? {});

  function submit(event) {
    event.preventDefault();

    let result = {};
    for (const [key, ref] of Object.entries(refs)) {
      if (ref.current.value === "") {
        ref.current.focus();
        return;
      }
      result[key] = ref.current.value;
    }

    const response = props.onSubmit(result);
    /* response: { status: ["ok", "error"], details: { fieldName: errorText, }, } */
    if (response?.status === "ok") {
      for (const [key, ref] of Object.entries(refs)) {
        ref.current.value = "";
      }
      document.activeElement.blur();
      setErrors({});

      props.onSuccess?.();
    } else if (response?.status === "error") {
      setErrors({ ...response.details, });

      props.onFailure?.();
    }
  }

  let renderChildren = [];
  let refs = {};
  
  React.Children.map(props.children, child => {
    if (child.props.hasOwnProperty("name")) {  // only Input has a name property
      const ref = createRef();
      refs[child.props.name] = ref;
      console.log(errors[child.props.name])
      renderChildren.push(React.cloneElement(child, { ref: ref, key: child.props.name, error: errors[child.props.name], onInput: () => {
        if (errors[child.props.name]) {
          console.log("trigger")
          let newErrors = { ...errors, };
          newErrors[child.props.name] = null;
          setErrors(newErrors);
        }
      }, }));
    } else {  // submit button
      renderChildren.push(React.cloneElement(child, { key: "submit-button", onClick: event => submit(event), }));
    }
  });

  return <form className={clsx(styles["form"], props.className)} onSubmit={submit}>
    {console.log(renderChildren)}
    {renderChildren}
    <input type="submit" style={{ visibility: "hidden", display: "none", }} />
  </form>;
}
