import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { GraduationCap, Lock, LogOut } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './index.css';

const API_URL = 'http://localhost:5000/api/students';
const AUTH_URL = 'http://localhost:5000/api/auth/login';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch students. Is the backend running?');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudents();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await axios.post(AUTH_URL, loginForm);
      if (response.data?.role === 'admin') {
        setIsAuthenticated(true);
        toast.success('Admin login successful');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
    toast.success('Logged out');
  };

  const handleAddStudent = async (studentData) => {
    try {
      const response = await axios.post(API_URL, studentData);
      setStudents([...students, response.data]);
      toast.success('Student added successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding student');
      return false;
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter(student => student._id !== id));
      toast.success('Student deleted');
    } catch (error) {
      toast.error('Error deleting student');
    }
  };

  return (
    <div className="container">
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
      
      <header className="header">
        <h1>
          <GraduationCap style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} size={48} />
          Student Portal
        </h1>
        <p>Manage your students seamlessly with modern tools</p>
      </header>

      {!isAuthenticated ? (
        <div className="login-wrapper">
          <div className="glass-card login-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Lock size={24} />
              <h2 style={{ fontWeight: '600' }}>Admin Login</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Sign in to access the admin dashboard.</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="admin"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="admin123"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isLoggingIn}>
                {isLoggingIn ? 'Signing in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className="btn btn-danger" style={{ width: 'auto' }} onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }} />
              Logout
            </button>
          </div>
          <div className="dashboard-grid">
            <div className="sidebar">
              <StudentForm onAdd={handleAddStudent} />
            </div>
            
            <div className="main-content">
              <StudentList 
                students={students} 
                loading={loading} 
                onDelete={handleDeleteStudent} 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
