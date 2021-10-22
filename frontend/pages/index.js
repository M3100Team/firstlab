import Head from 'next/head';
import { useState } from 'react';

import styles from '../styles/Home.module.scss';

import Layout from '../components/layout';
import InputForm from '../components/inputForm';

import { titleEnding } from '../lib/globals';

export default function Home() {
  const [errors, setErrors] = useState({ number: null, password: null, });

  function validateFields(fields) {
    let result = { status: "ok", details: {}, };

    /* field validation */
    if (parseInt(fields.number) < 100000 || parseInt(fields.number) > 999999) {
      result.status = "error";
      result.details = { ...result.details, number: "Некорректный номер", };
    }
    if (fields.password.length < 6) {
      result.status = "error";
      result.details = { ...result.details, password: "Короче 6 символов", };
    }

    return result;
  }

  return <Layout>
    <Head>
      <title>{"Главная страница" + titleEnding}</title>
    </Head>

    <InputForm
      inputs={{
        number: { title: "Номер ИСУ", type: "number", className: styles["homepage-input"], },
        password: { title: "Пароль", type: "password", className: styles["homepage-input"], },
      }}
      onSubmit={validateFields}
      className={styles["homepage-form"]}
    >
    </InputForm>
  </Layout>;
}
