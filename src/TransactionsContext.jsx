import { createContext, useContext, useReducer } from 'react'

const TransactionsContext = createContext()

const initialState = {
	transactions: [],
	textInput: '',
	amountInput: '',
}

function reducer(state, action) {
	switch (action.type) {
		case 'reset':
			return { ...state, transactions: [] }
		case 'updateTextInput':
			return { ...state, textInput: action.payload }
		case 'updateAmountInput':
			return { ...state, amountInput: Number(action.payload) }
		case 'addTransaction':
			if (state.textInput === '' || state.amountInput === '' || state.amountInput == 0) return { ...state }
			return {
				...state,
				transactions: [
					...state.transactions,
					{ id: state.transactions.length + 1, text: state.textInput, amount: state.amountInput },
				],
				textInput: '',
				amountInput: '',
			}
		default:
			throw new Error('Uknown action type')
	}
}

function TransactionsProvider({ children }) {
	const [{ transactions, textInput, amountInput }, dispatch] = useReducer(reducer, initialState)
	const income = transactions.reduce((acc, curr) => (curr.amount > 0 ? acc + curr.amount : acc), 0)
	const expense = transactions.reduce((acc, curr) => (curr.amount < 0 ? acc + curr.amount : acc), 0)
	const totalBalance = income - Math.abs(expense)
	return (
		<TransactionsContext.Provider
			value={{ transactions, textInput, amountInput, dispatch, income, expense, totalBalance }}>
			{children}
		</TransactionsContext.Provider>
	)
}

function useTransactions() {
	const context = useContext(TransactionsContext)
	if (context === undefined) throw new Error('TransactionsContext was used outside of the TransactionsProvider')
	return context
}

export { TransactionsProvider, useTransactions }
