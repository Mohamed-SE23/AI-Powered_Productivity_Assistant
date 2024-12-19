import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import Store from './app/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
    <Toaster position='top-center' reverseOrder={false} />
      <App />
    </Provider>
  </React.StrictMode>,
)
