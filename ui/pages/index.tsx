import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/staticdata', fetcher);
  //Handle the error state
  if (error) return <div>Failed to load file.</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;
  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Search</title>
        <meta name="description" content="A search api for github" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to GitHub Search!
        </h1>

        <p className={styles.description}>
          API v{data}
        </p>
        <button type="button" className={styles.button}>
          <Link href="/users" passHref>
            Users
          </Link>
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/WMRamadan/githubsearch"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by GitHub Search
          <span className={styles.logo}>
            <Image src="/search.svg" alt="Search Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
