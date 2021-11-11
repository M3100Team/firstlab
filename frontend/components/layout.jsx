import Head from 'next/head';
import { useContext, useState } from 'react';

import styles from './layout.module.scss';

import { titleEnding } from '../lib/globals';
import GlobalContext from '../lib/context';

function Navbar(props) {
  const context = useContext(GlobalContext);

  return <nav className={styles["navbar"]}>
    <div className={styles["nav-logo"]}>
      <img src="/static/images/logo.svg" alt="logo" width={116} height={80} />
    </div>
    <div className={styles["name-container"]}>
      <span>{context.userData.login ?? "Гость"}</span>
      <span>{context.userData.group}</span>
    </div>
  </nav>;
}

export default function Layout({ children }) {
  const [userData, setUserData] = useState({ login: null, group: null, });

  return <GlobalContext.Provider value={{ userData: userData, setUserData: newData => setUserData(newData), }}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{"Geolin" + titleEnding}</title>
      <meta
        name="description"
        content="Лучшая платформа для выполнения работ онлайн"
      />
    </Head>
    <Navbar />
    <main className={styles["main"]}>
        {children}
    </main>
  </GlobalContext.Provider>;
}