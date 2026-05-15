import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../store/authStore';
import { CheckCircle, PlayCircle, FileText, ArrowLeft, Download, ExternalLink } from 'lucide-react';
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

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  if (loading) return <div className="p-8 text-center text-text-muted">Loading course player...</div>;
  if (!course) return <div className="p-8 text-center text-rose-500">Course not found</div>;

  const isYoutube = activeLesson?.videoUrl?.includes('youtube') || activeLesson?.videoUrl?.includes('youtu.be');

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[80vh]">
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/courses')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Courses
          </Button>
          <div className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full uppercase tracking-wider">
            {course.category}
          </div>
        </div>

        <div className="bg-black aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl border border-border">
          {activeLesson?.videoUrl ? (
            isYoutube ? (
              <iframe
                src={getEmbedUrl(activeLesson.videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video src={activeLesson.videoUrl} controls className="w-full h-full object-contain" />
            )
          ) : (
            <div className="text-white/50 text-center">
              <PlayCircle className="h-20 w-20 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium">No video lecture for this topic</p>
            </div>
          )}
        </div>

        <div className="card p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-text-primary tracking-tight">
                {activeLesson?.title || 'Course Overview'}
              </h1>
              <p className="text-text-muted mt-2">
                {activeLesson?.description || course.description}
              </p>
            </div>

            {activeLesson?.pdfUrl && (
              <a
                href={activeLesson.pdfUrl.startsWith('http') ? activeLesson.pdfUrl : `https://backend-gc76.onrender.com${activeLesson.pdfUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 whitespace-nowrap"
              >
                <Download className="h-5 w-5" /> Download Notes (PDF)
              </a>
            )}
          </div>

          <div className="pt-6 border-t border-border">
            <h3 className="font-bold text-text-primary mb-2">About this Lesson</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              In this session, we dive deep into {activeLesson?.title || course.title}.
              Make sure to download the attached study materials and follow along with the video lecture.
            </p>
          </div>
        </div>
      </div>

      {/* Course Content Sidebar */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="card border border-border flex flex-col overflow-hidden h-[80vh]">
          <div className="p-6 border-b border-border bg-surface-hover/50">
            <h3 className="font-black text-text-primary text-lg leading-tight">{course.title}</h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-full bg-border rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="text-[10px] font-bold text-text-muted">0% Complete</span>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {course.modules?.length === 0 ? (
              <div className="p-8 text-sm text-text-muted text-center italic">No content uploaded yet.</div>
            ) : (
              course.modules?.map((module, mIdx) => (
                <div key={module._id || mIdx} className="border-b border-border last:border-b-0">
                  <div className="bg-surface-hover/30 px-6 py-4 font-black text-xs text-text-muted uppercase tracking-widest border-l-4 border-transparent">
                    {mIdx + 1}. {module.title}
                  </div>
                  <div className="py-1">
                    {module.lessons?.map((lesson, lIdx) => (
                      <button
                        key={lesson._id || lIdx}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full text-left px-6 py-4 text-sm flex items-start gap-4 hover:bg-surface-hover transition-all group ${activeLesson?.title === lesson.title ? 'bg-primary/5 border-l-4 border-primary' : 'border-l-4 border-transparent'
                          }`}
                      >
                        <div className={`mt-0.5 p-1.5 rounded-lg transition-colors ${activeLesson?.title === lesson.title ? 'bg-primary text-white' : 'bg-surface-hover text-text-muted group-hover:text-primary'}`}>
                          {lesson.videoUrl ? (
                            <PlayCircle className="h-4 w-4" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className={`block font-bold leading-snug ${activeLesson?.title === lesson.title ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                            {lesson.title}
                          </span>
                          <div className="flex items-center gap-3 mt-1">
                            {lesson.pdfUrl && <span className="text-[10px] flex items-center gap-1 text-emerald-500 font-bold"><FileText className="h-3 w-3" /> PDF Notes</span>}
                            {lesson.videoUrl && <span className="text-[10px] flex items-center gap-1 text-blue-500 font-bold"><PlayCircle className="h-3 w-3" /> Video</span>}
                          </div>
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
    </div>
  );
};

export default CoursePlayer;
