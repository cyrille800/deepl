import React from 'react'
import Head from 'next/head'
import MainBody from '../Compos/MainBody'
import MainFooter from '../Compos/MainFooter'
import MainHeader from '../Compos/MainHeader'

function MainCompo() {
    return (
<div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <MainHeader />
        <MainBody />
      </main>
    </div>
    )
}

export default MainCompo