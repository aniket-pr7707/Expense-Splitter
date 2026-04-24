import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({});
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expRes, balRes] = await Promise.all([
        API.get(`/expenses/${id}`),
        API.get(`/expenses/${id}/balances`)
      ]);
      setExpenses(expRes.data);
      setBalances(balRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async () => {
    if (!description.trim() || !amount) return;
    try {
      await API.post('/expenses', {
        description,
        amount: parseFloat(amount),
        groupId: id
      });
      setDescription('');
      setAmount('');
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-600 hover:underline font-semibold"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold text-blue-600">💸 Expense Splitter</h1>
      </nav>

      <div className="max-w-2xl mx-auto mt-8 px-4 space-y-6">

        {/* Add Expense */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Description (e.g. Dinner)"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount (₹)"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={addExpense}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Add Expense
            </button>
          </div>
        </div>

        {/* Balances */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Balances</h2>
          {Object.keys(balances).length === 0 ? (
            <p className="text-gray-500">No expenses yet!</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(balances).map(([userId, data]) => (
                <div key={userId} className="flex justify-between items-center border rounded-lg p-3">
                  <span className="font-medium">{data.name}</span>
                  <span className={`font-bold ${data.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.balance >= 0 ? '+' : ''}₹{data.balance.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Expenses</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : expenses.length === 0 ? (
            <p className="text-gray-500">No expenses yet. Add one above!</p>
          ) : (
            <div className="space-y-3">
              {expenses.map(expense => (
                <div key={expense._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{expense.description}</h3>
                    <span className="font-bold text-blue-600">₹{expense.amount}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Paid by {expense.paidBy?.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}