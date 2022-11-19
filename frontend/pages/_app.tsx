import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../state/store'

export default function App({ Component, pageProps }: AppProps) {
  //Ad redux
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
