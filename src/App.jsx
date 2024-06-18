const transactions = [
	{ amount: 5000, id: 4, text: 'Salary' },
	{ amount: -50, id: 1, text: 'Cinema' },
	{ amount: -3000, id: 3, text: 'Car' },
]

function App() {
	const income = transactions.reduce((acc, curr) => (curr.amount > 0 ? acc + curr.amount : acc), 0)
	const expense = transactions.reduce((acc, curr) => (curr.amount < 0 ? acc + curr.amount : acc), 0)

	return (
		<div className='expense-tracker'>
			<h2 className='expense-tracker__title'>Expense Tracker</h2>
			<Balance income={income} expense={expense} />
			<TransactionsHistory transactions={transactions} />
			<NewTransaction />
		</div>
	)
}

function Balance({ income, expense }) {
	const totalBalance = income - Math.abs(expense)
	return (
		<div className='expense-tracker__balance section'>
			<h3 className='expense-tracker__balance-title section-title'>Your balance</h3>
			<p className='expense-tracker__total-balance'>
				{totalBalance >= 0 ? `$${totalBalance.toFixed(2)}` : `-$${Math.abs(totalBalance).toFixed(2)}`}
			</p>
			<BalanceBoxes income={income} expense={expense} />
			<Btn className='expense-tracker__reset-btn btn'>Reset balance</Btn>
		</div>
	)
}

function BalanceBoxes({ income, expense }) {
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
				{balance >= 0 ? `${balance.toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`}
			</p>
		</div>
	)
}

function TransactionsHistory({ transactions }) {
	return (
		<div className='expense-tracker__history section'>
			<h3 className='expense-tracker__history-title section-title'>History</h3>
			<hr />
			{transactions.length === 0 ? (
				<p>You don't have any transactions yet!</p>
			) : (
				<TransactionsList transactions={transactions} />
			)}
		</div>
	)
}

function TransactionsList({ transactions }) {
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
	return (
		<div className='expense-tracker__new-transaction section'>
			<h3 className='expense-tracker__new-transaction-title section-title'>Add new transaction</h3>
			<hr />
			<InputBoxes />
			<Btn className='expense-tracker__add-btn btn'>Add transaction</Btn>
		</div>
	)
}

function InputBoxes() {
	return (
		<div className='expense-tracker__input-boxes'>
			<InputBox desc='text'>Text</InputBox>
			<InputBox desc='amount'>
				Amount <br />
				(negative - expense, positive - income)
			</InputBox>
		</div>
	)
}

function InputBox({ desc, children }) {
	return (
		<div className='expense-tracker__input-box'>
			<label htmlFor='text-input' className='expense-tracker__input-desc'>
				{children}
			</label>
			<input id={`${desc}-input`} type='text' className='expense-tracker__input' placeholder={`Enter ${desc}...`} />
		</div>
	)
}

function Btn({ className, children }) {
	return <button className={className}>{children}</button>
}

export default App
