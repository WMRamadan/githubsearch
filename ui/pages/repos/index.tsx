import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


export default function Users() {
    const [total_count, setCount] = useState()
    const [repo_items, setItems] = useState()
    const  handleSubmit = async (event: {
        target: any; preventDefault: () => void; 
        }) => {
            event.preventDefault()

            const data = {
                user: event.target.user.value,
            }

            const JSONdata = JSON.stringify(data)

            const endpoint = '/api/repos_api'

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
        <h1 className={styles.title}>
          Welcome to Repos Search!
        </h1>

        <p className={styles.description}>
          This is the Repos section!
        </p>
        <button type="button" className={styles.button}>
          <Link href="/" passHref>
            Home
          </Link>
        </button>
        <form onSubmit={handleSubmit}>
            <label htmlFor="user">User: </label>
            <input type="text" id="user" name="user" required/>
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
                Name
              </th>
              <th>
                URL
              </th>
            </tr>
          </thead>
          {repo_items && repo_items?.map((item: { id: number, name: string, full_name: string; }) => (
            <><tr>
              <td>
                {item.id}
              </td>
              <td>
                {item.name}
              </td>
              <td>
                <a href={"https://github.com/" + item.full_name} target="_blank" rel="noreferrer">{item.full_name}</a>
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