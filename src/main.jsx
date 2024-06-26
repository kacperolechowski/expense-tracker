import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { TransactionsProvider } from './TransactionsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<TransactionsProvider>
			<App />
		</TransactionsProvider>
	</React.StrictMode>
)
