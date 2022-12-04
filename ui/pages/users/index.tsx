import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';


export default function Users() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Search</title>
        <meta name="description" content="A search api for github" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Users Search!
        </h1>

        <p className={styles.description}>
          This is the Users section!
        </p>
        <button type="button" className={styles.button}>
          <Link href="/" passHref>
            Home
          </Link>
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}