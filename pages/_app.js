import "@lib/dayjsConfig";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import { AppShell } from '@mantine/core';

import Header from "@components/Header";
import Footer from "@components/Footer";

function MyApp({ Component, pageProps }) {
  return (
<MantineProvider
  defaultColorScheme="dark"
  theme={{
    primaryColor: 'red',
    primaryShade: 6,
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    fontFamilyMonospace: 'Fira Mono, monospace',
    fontSizes: {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 22,
      xl: 28,
    },
    headings: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      sizes: {
        h1: { fontSize: 36, fontWeight: 800 },
        h2: { fontSize: 28, fontWeight: 700 },
        h3: { fontSize: 22, fontWeight: 700 },
      },
    },

    radius: {
      sm: 6,
      md: 12,
      lg: 24,
    },
    colors: {
      orange: [
        '#fff4e6', '#ffe8cc', '#ffd8a8', '#ffc078', '#ffa94d',
        '#ff922b', '#fd7e14', '#f76707', '#e8590c', '#d9480f'
      ],
      yellow: [
        '#fff9db', '#fff3bf', '#ffec99', '#ffe066', '#ffd43b',
        '#fcc419', '#fab005', '#f59f00', '#f08c00', '#e67700'
      ],
      teal: [
        '#e6fcf5', '#c3fae8', '#96f2d7', '#63e6be', '#38d9a9',
        '#20c997', '#12b886', '#0ca678', '#099268', '#087f5b'
      ],
      violet: [
        '#f3f0ff', '#e5dbff', '#d0bfff', '#b197fc', '#9775fa',
        '#845ef7', '#7950f2', '#7048e8', '#6741d9', '#5f3dc4'
      ],
      gray: [
        '#f8f9fa', '#f1f3f5', '#e9ecef', '#dee2e6', '#ced4da',
        '#adb5bd', '#868e96', '#495057', '#343a40', '#212529'
      ],
      red: [
        '#ffeaea',
        '#ffc5c5',
        '#ff9e9e',
        '#ff7b7b',
        '#ff5252',
        '#ff1744',
        '#e53935',
        '#b71c1c',
        '#8a1313',
        '#5a0808' 
      ],
      blue: [
        '#e3f2fd',
        '#bbdefb',
        '#90caf9',
        '#64b5f6',
        '#42a5f5',
        '#2196f3',
        '#1976d2',
        '#0d47a1',
        '#08306b',
        '#021f3a' 
      ],
      green: [
        '#e8f5e9',
        '#c8e6c9',
        '#a5d6a7',
        '#81c784',
        '#66bb6a',
        '#43a047',
        '#388e3c',
        '#1b5e20',
        '#124116',
        '#06240a' 
      ],

    }
  }}
>
      <Header />
      <AppShell padding="md">
        <AppShell.Main>
          <Component {...pageProps} />
          <Footer />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default MyApp;
