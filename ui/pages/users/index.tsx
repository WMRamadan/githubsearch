import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function Users() {
  const [total_count, setCount] = useState()
    const [user_items, setItems] = useState()
    const  handleSubmit = async (event: {
        target: any; preventDefault: () => void; 
        }) => {
            event.preventDefault()

            const data = {
                location: event.target.location.value,
            }

            const JSONdata = JSON.stringify(data)

            const endpoint = '/api/users_api'

            const options = {

                method: 'POST',

                headers: {
                  'Content-Type': 'application/json',
                },

                body: JSONdata,
              }

              const response = await fetch(endpoint, options)

              const result = await response.json()
            
              setCount(result.total_count)
              setItems(result.items)
        }
  return (
    <div className={styles.container}>
      <Head>
        <title>GitHub Search</title>
        <meta name="description" content="A search api for github" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 id="title" className={styles.title}>
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="location">Location: </label>
            <input type="text" id="location" name="location" required/>
            <button type="submit">Search</button>
        </form>
        <p>Result: {total_count}</p>
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
          {user_items && user_items?.map((item: { id: number, node_id: string, login: string, html_url: string; }) => (
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