import Head from 'next/head';
import Image from 'next/image';

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
    <nav className={styles["navbar"]}>
      <div className={styles["nav-logo"]}>
        <Image src="/static/images/logo.svg" alt="logo" width={116} height={80} />
      </div>
    </nav>
    <main className={styles.main}>
      {children}
    </main>
  </>;
}