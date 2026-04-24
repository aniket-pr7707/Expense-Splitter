import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await API.get('/groups');
      setGroups(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async () => {
    if (!groupName.trim()) return;
    try {
      const res = await API.post('/groups', { name: groupName });
      setGroups([...groups, res.data]);
      setGroupName('');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">💸 Expense Splitter</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Hi, {user?.name}!</span>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create New Group</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Group name (e.g. Trip to Goa)"
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button
              onClick={createGroup}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Create
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Your Groups</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : groups.length === 0 ? (
            <p className="text-gray-500">No groups yet. Create one above!</p>
          ) : (
            <div className="space-y-3">
              {groups.map(group => (
                <div
                  key={group._id}
                  onClick={() => navigate(`/groups/${group._id}`)}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition"
                >
                  <h3 className="font-semibold text-gray-800">{group.name}</h3>
                  <p className="text-sm text-gray-500">
                    {group.members.length} member(s)
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