import '@styles/globals.css'
import '@styles/responsive.css'
import '@lib/dayjsConfig'; 

import Header from '@components/Header'
import Footer from '@components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
