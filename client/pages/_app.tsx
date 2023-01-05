import NavBar from '../components/NavBar'
import { client } from '../apolloClient'
import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className = 'overflow-hidden font-nunito'>
    <ApolloProvider client = {client}>
      <NavBar />
      <Component {...pageProps} />
    </ApolloProvider>
  </div>
}
