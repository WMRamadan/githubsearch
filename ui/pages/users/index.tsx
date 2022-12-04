import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import useSWR from 'swr';
import { ListGroupItem, ListGroup } from "reactstrap";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

export default function Users() {
  const { data, error } = useSWR('/api/api', fetcher);
  //Handle the error state
  if (error) return <div>Failed to load from api.</div>;
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
        <ListGroup>
          <ListGroupItem>Total Users: {data.total_count}</ListGroupItem>
        </ListGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                ID
              </th>
              <th>
                Node ID
              </th>
              <th>
                Login Name
              </th>
              <th>
                URL
              </th>
            </tr>
          </thead>
          {data.items.map((item: { id: number, node_id: string, login: string, html_url: string; }) => (
            <><tr>
              <td>
                {item.id}
              </td>
              <td>
                {item.node_id}
              </td>
              <td>
                {item.login}
              </td>
              <td>
                <a href={item.html_url} target="_blank" rel="noreferrer">{item.html_url}</a>
              </td>
            </tr></>
          ))}
        </Table>
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