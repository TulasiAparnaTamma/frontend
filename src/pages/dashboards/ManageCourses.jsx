import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, ArrowRight } from 'lucide-react';
import { api } from '../../store/authStore';
import { Button } from '../../components/ui/Button';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you might have a specific endpoint for /api/courses/faculty/me
    // Here we'll just fetch all and assume the backend filters if needed, 
    // or we filter client-side if we get all courses.
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (isLoading) return <div className="p-8 text-center">Loading courses...</div>;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Manage Courses</h1>
          <p className="text-text-muted mt-1">Select a course to manage students, materials, and attendance.</p>
        </div>
        <Button onClick={() => navigate('/dashboard/courses/new')}>Create New</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course._id} className="card overflow-hidden flex flex-col group cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate(`/dashboard/courses/${course._id}/manage`)}>
            <div className="h-40 bg-surface-hover relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold px-2 py-1 bg-primary/80 text-white rounded-md uppercase tracking-wider">{course.category}</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-1">{course.title}</h3>
              <p className="text-sm text-text-muted mb-4 line-clamp-2">{course.description}</p>
              
              <div className="mt-auto flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-bold">{course.enrolledStudents?.length || 0}</span>
                </div>
                <div className="flex items-center gap-1 text-primary group-hover:underline">
                  Manage <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full text-center py-12 text-text-muted">
            No courses found. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
