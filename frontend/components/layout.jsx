import Head from 'next/head';

import styles from './layout.module.scss';

import { titleEnding } from '../lib/globals';

export default function Layout({ children }) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{"Geolin" + titleEnding}</title>
      <meta
        name="description"
        content="Лучшая платформа для выполнения работ онлайн"
      />
    </Head>
    <main className={styles.main}>
      {children}
    </main>
  </>;
}