import { useState, useEffect } from 'react';
import { api } from '../../store/authStore';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      setCourses(data);
    } catch (error) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/courses/${courseId}/enroll`);
      toast.success('Successfully enrolled in course!');
      // Ideally refresh the list or redirect to my courses
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll');
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Course Catalog</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface border border-border text-text-primary rounded-xl focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse bg-surface-hover h-64 rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course._id} className="card overflow-hidden group">
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                  <div className="flex items-center text-sm text-text-secondary">
                    <img src={course.instructor?.avatar} alt="" className="w-6 h-6 rounded-full mr-2 border border-border" />
                    <span className="font-medium">{course.instructor?.name}</span>
                  </div>
                  <Button size="sm" onClick={() => handleEnroll(course._id)}>Enroll</Button>
                </div>
              </div>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-muted">
              <BookOpen className="mx-auto h-12 w-12 text-text-muted/50 mb-3" />
              <p>No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
