import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../store/authStore';
import { CheckCircle, PlayCircle, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      setCourse(data);
      if (data.modules && data.modules.length > 0 && data.modules[0].lessons.length > 0) {
        setActiveLesson(data.modules[0].lessons[0]);
      }
    } catch (error) {
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-text-muted">Loading course player...</div>;
  if (!course) return <div className="p-8 text-center text-rose-500">Course not found</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col space-y-4">
        <Button variant="ghost" className="w-fit" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <div className="bg-black aspect-video rounded-xl flex items-center justify-center relative overflow-hidden shadow-sm">
          {activeLesson?.videoUrl ? (
             <video src={activeLesson.videoUrl} controls className="w-full h-full object-cover" />
          ) : (
            <div className="text-text-primary text-center">
              <PlayCircle className="h-16 w-16 mx-auto mb-2 opacity-50" />
              <p>Video not available</p>
            </div>
          )}
        </div>
        <div className="card p-6 border border-border flex-1 overflow-auto">
          <h2 className="text-2xl font-bold text-text-primary tracking-tight mb-2">
            {activeLesson?.title || 'Welcome to the Course'}
          </h2>
          <p className="text-text-secondary">
            {activeLesson?.description || course.description}
          </p>
        </div>
      </div>

      {/* Course Content Sidebar */}
      <div className="w-full md:w-80 card border border-border flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-hover">
          <h3 className="font-semibold text-text-primary line-clamp-1">{course.title}</h3>
          <p className="text-xs text-text-secondary mt-1">Course Content</p>
        </div>
        <div className="overflow-y-auto flex-1">
          {course.modules?.length === 0 ? (
             <div className="p-4 text-sm text-text-muted text-center">No modules available yet.</div>
          ) : (
            course.modules?.map((module, mIdx) => (
              <div key={module._id || mIdx} className="border-b border-border last:border-b-0">
                <div className="bg-surface-hover px-4 py-3 font-medium text-sm text-text-primary">
                  Section {mIdx + 1}: {module.title}
                </div>
                <div>
                  {module.lessons?.map((lesson, lIdx) => (
                    <button
                      key={lesson._id || lIdx}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left px-4 py-3 text-sm flex items-start gap-3 hover:bg-surface-hover transition-colors ${
                        activeLesson?._id === lesson._id ? 'bg-primary/5 border-l-4 border-primary' : 'border-l-4 border-transparent'
                      }`}
                    >
                      {lesson.videoUrl ? (
                        <PlayCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${activeLesson?._id === lesson._id ? 'text-primary' : 'text-text-muted'}`} />
                      ) : (
                        <FileText className="h-5 w-5 mt-0.5 flex-shrink-0 text-text-muted" />
                      )}
                      <div>
                        <span className={`block font-medium ${activeLesson?._id === lesson._id ? 'text-primary' : 'text-text-secondary'}`}>
                          {lIdx + 1}. {lesson.title}
                        </span>
                        {lesson.duration && (
                          <span className="text-xs text-text-muted">{lesson.duration} min</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
