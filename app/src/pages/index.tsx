import type { NextPage } from 'next'
import Head from 'next/head'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import styles from '../styles/Home.module.css'
import Layout from '@/components/Layout'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{'RealitySync'}</title>

        <meta content={'Generated by @rainbow-me/create-rainbowkit'} name={'description'} />
        <link href={'/images/Logo_0.png'} rel={'icon'} />
      </Head>
      <Layout>
        <div className={"text-[#0000]"}>{" a "}</div>
      </Layout>
    </div>
  )
}

export default Home
