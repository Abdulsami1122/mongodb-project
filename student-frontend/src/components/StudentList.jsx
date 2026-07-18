import { Trash2, UserSearch, BookOpen, Clock } from 'lucide-react';

const StudentList = ({ students, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>Loading students...</div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="glass-card empty-state">
        <UserSearch className="empty-icon" />
        <h2>No Students Found</h2>
        <p>Use the form on the left to add your first student to the database.</p>
      </div>
    );
  }

  return (
    <div className="students-grid">
      {students.map((student, index) => (
        <div 
          key={student._id} 
          className="student-card"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="student-header">
            <div>
              <div className="student-name">{student.name}</div>
              <div className="student-email">{student.email}</div>
            </div>
            <button 
              className="btn btn-danger" 
              onClick={() => onDelete(student._id)}
              title="Delete Student"
            >
              <Trash2 size={16} />
            </button>
          </div>
          
          <div className="student-info">
            <span className="info-badge">
              <Clock size={14} />
              {student.age} yrs
            </span>
            <span className="info-badge">
              <BookOpen size={14} />
              {student.course}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
