import { useState, useEffect } from 'react';
import { api } from '../../store/authStore';
import { FileText, Upload, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo purposes, we'll just mock fetching assignments or fetch if we had a proper course context
    // Ideally we'd fetch courses first, then fetch assignments for those courses
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    // Simulated mock data since we don't have a specific course selected in this view yet
    setTimeout(() => {
      setAssignments([
        {
          _id: '1',
          title: 'React Fundamentals Final Project',
          description: 'Build a small e-commerce frontend using React and Context API. Submit your GitHub repo link.',
          dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
          totalMarks: 100,
          status: 'pending' // custom frontend status
        },
        {
          _id: '2',
          title: 'CSS Layouts Exercise',
          description: 'Replicate the provided Figma design using Flexbox and Grid.',
          dueDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          totalMarks: 50,
          status: 'submitted',
          marksObtained: 45
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (id) => {
    toast.success('Assignment submitted successfully! (Mock)');
  };

  if (loading) return <div className="animate-pulse space-y-4">
    <div className="h-8 bg-surface-hover rounded w-1/4"></div>
    <div className="h-32 bg-surface-hover rounded-2xl"></div>
    <div className="h-32 bg-surface-hover rounded-2xl"></div>
  </div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary tracking-tight">My Assignments</h2>

      <div className="grid grid-cols-1 gap-6">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${assignment.status === 'submitted' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                  {assignment.status === 'submitted' ? <CheckCircle className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-primary">{assignment.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{assignment.description}</p>
                  <div className="mt-3 flex items-center space-x-4 text-sm">
                    <span className="text-text-muted">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                    <span className="text-text-muted">
                      Marks: {assignment.totalMarks}
                    </span>
                    {assignment.status === 'submitted' && (
                      <span className="font-medium text-emerald-500">
                        Score: {assignment.marksObtained}/{assignment.totalMarks}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {assignment.status === 'pending' ? (
                  <>
                    <input type="file" className="text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer" />
                    <Button onClick={() => handleSubmit(assignment._id)}>
                      <Upload className="mr-2 h-4 w-4" /> Submit Work
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" disabled>Submitted</Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
