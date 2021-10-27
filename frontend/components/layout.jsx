import Head from 'next/head';

import styles from './layout.module.scss';

import { titleEnding } from '../lib/globals';

function Navbar(props) {
  return <nav className={styles["navbar"]}>
    <div className={styles["nav-logo"]}>
      <img src="/static/images/logo.svg" alt="logo" width={116} height={80} />
    </div>
    <div className={styles["name-container"]}>
      <span>Гусь Разведчик</span>
      <span>M3100</span>
    </div>
  </nav>;
}

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
    <Navbar />
    <main className={styles.main}>
      {children}
    </main>
  </>;
}