import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { GraduationCap } from 'lucide-react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './index.css';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

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
    fetchStudents();
  }, []);

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
    </div>
  );
}

export default App;
