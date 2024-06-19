import { useTransactions } from './TransactionsContext'

function App() {
	return (
		<div className='expense-tracker'>
			<h2 className='expense-tracker__title'>Expense Tracker</h2>
			<Balance />
			<TransactionsHistory />
			<NewTransaction />
		</div>
	)
}

function Balance() {
	const { totalBalance, dispatch } = useTransactions()

	return (
		<div className='expense-tracker__balance section'>
			<h3 className='expense-tracker__balance-title section-title'>Your balance</h3>
			<p className='expense-tracker__total-balance'>
				{totalBalance >= 0 ? `$${totalBalance.toFixed(2)}` : `-$${Math.abs(totalBalance).toFixed(2)}`}
			</p>
			<BalanceBoxes />
			<Btn className='expense-tracker__reset-btn btn' onClick={() => dispatch({ type: 'reset' })}>
				Reset balance
			</Btn>
		</div>
	)
}

function BalanceBoxes() {
	const { income, expense } = useTransactions()
	return (
		<div className='expense-tracker__balance-boxes'>
			<BalanceBox boxType='income' balance={income} />
			<div className='expense-tracker__separate-line'></div>
			<BalanceBox boxType='expense' balance={expense} />
		</div>
	)
}

function BalanceBox({ boxType, balance }) {
	return (
		<div className='expense-tracker__balance-box'>
			<p className='expense-tracker__box-title'>{boxType}</p>
			<p className={`expense-tracker__partial-balance expense-tracker__partial-balance--${boxType}`}>
				{balance >= 0 ? `$${balance.toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`}
			</p>
		</div>
	)
}

function TransactionsHistory() {
	const { transactions } = useTransactions()
	return (
		<div className='expense-tracker__history section'>
			<h3 className='expense-tracker__history-title section-title'>History</h3>
			<hr />
			{transactions.length === 0 ? <p>You don't have any transactions yet!</p> : <TransactionsList />}
		</div>
	)
}

function TransactionsList() {
	const { transactions } = useTransactions()
	return (
		<ul className='expense-tracker__transactions'>
			{transactions.map(transaction => (
				<Transaction el={transaction} key={transaction.id} />
			))}
		</ul>
	)
}

function Transaction({ el }) {
	return (
		<li
			className={`expense-tracker__transaction ${
				el.amount > 0 ? 'expense-tracker__transaction--income' : 'expense-tracker__transaction--expense'
			}`}>
			<span className='expense-tracker__transaction-text'>{el.text}</span>
			<span className='expense-tracker__transaction-amount'>{el.amount > 0 ? `+${el.amount}` : el.amount}</span>
		</li>
	)
}

function NewTransaction() {
	const { dispatch } = useTransactions()
	return (
		<div className='expense-tracker__new-transaction section'>
			<h3 className='expense-tracker__new-transaction-title section-title'>Add new transaction</h3>
			<hr />
			<InputBoxes />
			<Btn className='expense-tracker__add-btn btn' onClick={() => dispatch({ type: 'addTransaction' })}>
				Add transaction
			</Btn>
		</div>
	)
}

function InputBoxes() {
	const { textInput, amountInput } = useTransactions()
	return (
		<div className='expense-tracker__input-boxes'>
			<InputBox desc='text' type='text' inputValue={textInput} actionType='updateTextInput'>
				Text
			</InputBox>
			<InputBox desc='amount' type='number' inputValue={amountInput} actionType='updateAmountInput'>
				Amount <br />
				(negative - expense, positive - income)
			</InputBox>
		</div>
	)
}

function InputBox({ desc, type, children, inputValue, actionType }) {
	const { dispatch } = useTransactions()
	return (
		<div className='expense-tracker__input-box'>
			<label htmlFor={`${desc}-input`} className='expense-tracker__input-desc'>
				{children}
			</label>
			<input
				id={`${desc}-input`}
				type={type}
				className='expense-tracker__input'
				placeholder={`Enter ${desc}...`}
				value={inputValue}
				onChange={e => {
					dispatch({ type: actionType, payload: e.target.value })
				}}
			/>
		</div>
	)
}

function Btn({ className, children, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	)
}

export default App
