import Head from 'next/head';
import { useState } from 'react';

import styles from '../styles/Home.module.scss';

import Layout from '../components/layout';
import InputForm from '../components/inputForm';
import Input from '../components/input';

import { titleEnding } from '../lib/globals';

export default function Home() {
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
      onSubmit={validateFields}
      className={styles["homepage-form"]}
    >
      <Input name="number" title="Номер ИСУ" type="number" className={styles["homepage-input"]} />
      <Input name="password" title="Пароль" type="password" className={styles["homepage-input"]} />
    </InputForm>
  </Layout>;
}
