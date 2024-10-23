import "@styles/globals.css";
import "@styles/responsive.css";
import "@lib/dayjsConfig";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
