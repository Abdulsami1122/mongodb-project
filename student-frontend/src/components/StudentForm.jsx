import { useState } from 'react';
import { UserPlus } from 'lucide-react';

const StudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onAdd({
      ...formData,
      age: Number(formData.age)
    });

    if (success) {
      setFormData({ name: '', email: '', age: '', course: '' });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="John Doe"
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="john@example.com"
            required 
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="20"
            min="10"
            max="100"
            required 
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <input 
            type="text" 
            name="course" 
            value={formData.course} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="e.g. MERN Stack"
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          <UserPlus size={20} />
          {isSubmitting ? 'Saving...' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
