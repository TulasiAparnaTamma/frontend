import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Calendar, Settings, Plus, FileText, Video, Save, UserPlus, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { api } from '../../store/authStore';
import toast from 'react-hot-toast';

const FacultyCourseDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('settings');
  const [isLoading, setIsLoading] = useState(true);

  // States for Students Tab
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // States for Attendance Tab
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    fetchCourseData();
    if (activeTab === 'students') fetchStudents();
    if (activeTab === 'attendance') fetchAttendance();
  }, [id, activeTab, attendanceDate]);

  const fetchCourseData = async () => {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      toast.error('Failed to load course details');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get('/users/students');
      setStudents(res.data);
    } catch (err) {
      toast.error('Failed to load students');
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await api.get(`/attendance/${id}?date=${attendanceDate}`);
      if (res.data.length > 0) {
        const recordsObj = {};
        res.data[0].records.forEach(r => {
          recordsObj[r.student._id] = r.status;
        });
        setAttendanceRecords(recordsObj);
      } else {
        setAttendanceRecords({});
      }
    } catch (err) {
      toast.error('Failed to load attendance');
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/courses/${id}`, {
        title: course.title,
        description: course.description
      });
      toast.success('Course settings updated');
    } catch (err) {
      toast.error('Failed to update course');
    }
  };

  const handleEnrollStudent = async (studentId) => {
    try {
      await api.post(`/courses/${id}/enroll-student`, { studentId });
      toast.success('Student enrolled successfully');
      fetchCourseData(); // refresh enrolled list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to enroll student');
    }
  };

  const handleAddModule = () => {
    const newModule = { title: 'New Module', description: '', lessons: [] };
    const updatedModules = [...(course.modules || []), newModule];
    setCourse({ ...course, modules: updatedModules });
  };

  const handleAddLesson = (moduleIndex) => {
    const newLesson = { title: 'New Topic', description: '', videoUrl: '', pdfUrl: '' };
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].lessons.push(newLesson);
    setCourse({ ...course, modules: updatedModules });
  };

  const handleUpdateModules = async () => {
    try {
      await api.put(`/courses/${id}`, { modules: course.modules });
      toast.success('Materials updated successfully');
    } catch (err) {
      toast.error('Failed to update materials');
    }
  };

  const handleDeleteModule = (moduleIndex) => {
    const updatedModules = [...course.modules];
    updatedModules.splice(moduleIndex, 1);
    setCourse({ ...course, modules: updatedModules });
  };

  const handleDeleteLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setCourse({ ...course, modules: updatedModules });
  };

  const handleFileUpload = async (e, moduleIndex, lessonIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading('Uploading file...');
    const formData = new FormData();
    formData.append('document', file);

    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const updatedModules = [...course.modules];
      updatedModules[moduleIndex].lessons[lessonIndex].pdfUrl = res.data;
      setCourse({ ...course, modules: updatedModules });
      toast.success('File uploaded successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to upload file', { id: toastId });
    }
  };

  const handleSaveAttendance = async () => {
    try {
      const recordsArray = Object.keys(attendanceRecords).map(studentId => ({
        student: studentId,
        status: attendanceRecords[studentId]
      }));
      
      await api.post(`/attendance/${id}`, {
        date: attendanceDate,
        records: recordsArray
      });
      toast.success('Attendance saved');
    } catch (err) {
      toast.error('Failed to save attendance');
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!course) return <div className="text-center py-20">Course not found</div>;

  const tabs = [
    { id: 'settings', name: 'Overview', icon: Settings },
    { id: 'materials', name: 'Materials', icon: BookOpen },
    { id: 'students', name: 'Students', icon: Users },
    { id: 'attendance', name: 'Attendance', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/dashboard/courses')}>&larr; Back</Button>
        <h1 className="text-3xl font-black text-text-primary tracking-tight">Course: {course.title}</h1>
      </div>

      <div className="flex border-b border-border mb-6 overflow-x-auto custom-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="card p-6">
        {activeTab === 'settings' && (
          <form onSubmit={handleUpdateSettings} className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Course Details</h2>
            <Input
              label="Course Title"
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              required
            />
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary">Course Description</label>
              <textarea
                className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-primary transition-colors min-h-[120px]"
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
          </form>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Course Modules</h2>
              <Button onClick={handleAddModule} size="sm"><Plus className="h-4 w-4 mr-2" /> Add Module</Button>
            </div>
            
            {(course.modules || []).map((mod, modIdx) => (
              <div key={modIdx} className="border border-border rounded-xl p-4 space-y-4 bg-surface-hover/30">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Module Title"
                      value={mod.title}
                      onChange={(e) => {
                        const newMods = [...course.modules];
                        newMods[modIdx].title = e.target.value;
                        setCourse({ ...course, modules: newMods });
                      }}
                    />
                  </div>
                  <button onClick={() => handleDeleteModule(modIdx)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors" title="Delete Module">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="pl-6 border-l-2 border-border space-y-4 mt-4">
                  <div className="flex justify-between items-center text-sm font-bold text-text-secondary">
                    Topics/Lessons
                    <Button variant="ghost" size="sm" onClick={() => handleAddLesson(modIdx)}>
                      <Plus className="h-3 w-3 mr-1" /> Add Topic
                    </Button>
                  </div>
                  
                  {mod.lessons.map((lesson, lessIdx) => (
                    <div key={lessIdx} className="card p-4 space-y-3 bg-surface relative group">
                      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDeleteLesson(modIdx, lessIdx)} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors" title="Delete Topic">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="pr-10">
                        <Input
                          placeholder="Topic Title"
                          value={lesson.title}
                          onChange={(e) => {
                            const newMods = [...course.modules];
                            newMods[modIdx].lessons[lessIdx].title = e.target.value;
                            setCourse({ ...course, modules: newMods });
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-text-secondary">PDF Document (Notes)</label>
                          {lesson.pdfUrl ? (
                            <div className="flex items-center justify-between bg-surface-hover p-2 rounded-lg border border-border">
                              <span className="text-sm truncate text-primary flex items-center gap-2">
                                <FileText className="h-4 w-4" /> 
                                {lesson.pdfUrl.split('-').pop() || 'Document Attached'}
                              </span>
                              <button onClick={() => {
                                const newMods = [...course.modules];
                                newMods[modIdx].lessons[lessIdx].pdfUrl = '';
                                setCourse({ ...course, modules: newMods });
                              }} className="text-xs text-text-muted hover:text-rose-500">Remove</button>
                            </div>
                          ) : (
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.ppt,.pptx"
                              onChange={(e) => handleFileUpload(e, modIdx, lessIdx)}
                              className="block w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-bold text-text-secondary">Video Link</label>
                          <Input
                            placeholder="Video URL (YouTube, Vimeo...)"
                            value={lesson.videoUrl || ''}
                            onChange={(e) => {
                              const newMods = [...course.modules];
                              newMods[modIdx].lessons[lessIdx].videoUrl = e.target.value;
                              setCourse({ ...course, modules: newMods });
                            }}
                            icon={Video}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Button onClick={handleUpdateModules} className="mt-6 w-full sm:w-auto"><Save className="h-4 w-4 mr-2" /> Save Materials</Button>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Add Existing Students</h2>
              <div className="flex gap-4 mb-4">
                <Input
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {students
                  .filter(s => 
                    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    s.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    !course.enrolledStudents.some(es => es.student._id === s._id)
                  )
                  .map(student => (
                    <div key={student._id} className="card p-4 flex justify-between items-center bg-surface-hover/50">
                      <div className="truncate pr-4">
                        <p className="font-bold text-sm text-text-primary truncate">{student.name}</p>
                        <p className="text-xs text-text-muted truncate">{student.email}</p>
                      </div>
                      <Button size="sm" onClick={() => handleEnrollStudent(student._id)}><UserPlus className="h-4 w-4" /></Button>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <h2 className="text-xl font-bold mb-4">Enrolled Students ({course.enrolledStudents?.length || 0})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {course.enrolledStudents?.map(enrollment => (
                  <div key={enrollment._id} className="card p-4 flex items-center gap-3">
                    <img src={enrollment.student.avatar || `https://ui-avatars.com/api/?name=${enrollment.student.name}`} alt="" className="w-10 h-10 rounded-full" />
                    <div className="truncate">
                      <p className="font-bold text-sm text-text-primary truncate">{enrollment.student.name}</p>
                      <p className="text-xs text-text-muted truncate">Progress: {enrollment.progress.percentage}%</p>
                    </div>
                  </div>
                ))}
                {course.enrolledStudents?.length === 0 && <p className="text-text-muted text-sm">No students enrolled yet.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold">Daily Attendance Tracker</h2>
              <input
                type="date"
                className="bg-surface-hover border border-border rounded-xl px-4 py-2 text-text-primary focus:outline-none focus:border-primary"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </div>

            <div className="bg-surface-hover/30 rounded-xl border border-border overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-bold text-text-secondary">Student Name</th>
                    <th className="px-6 py-4 font-bold text-text-secondary text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {course.enrolledStudents?.map(enrollment => {
                    const isPresent = attendanceRecords[enrollment.student._id] !== 'absent';
                    return (
                      <tr key={enrollment._id} className="hover:bg-surface-hover/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-text-primary flex items-center gap-3">
                          <img src={enrollment.student.avatar || `https://ui-avatars.com/api/?name=${enrollment.student.name}`} className="w-8 h-8 rounded-full" />
                          {enrollment.student.name}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex bg-surface border border-border rounded-lg p-1">
                            <button
                              onClick={() => setAttendanceRecords({ ...attendanceRecords, [enrollment.student._id]: 'present' })}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${isPresent ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'text-text-muted hover:bg-surface-hover'}`}
                            >
                              <CheckCircle className="h-3 w-3" /> Present
                            </button>
                            <button
                              onClick={() => setAttendanceRecords({ ...attendanceRecords, [enrollment.student._id]: 'absent' })}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${!isPresent ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'text-text-muted hover:bg-surface-hover'}`}
                            >
                              <XCircle className="h-3 w-3" /> Absent
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {course.enrolledStudents?.length === 0 && (
                    <tr>
                      <td colSpan="2" className="px-6 py-8 text-center text-text-muted">No students enrolled to take attendance.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {course.enrolledStudents?.length > 0 && (
              <Button onClick={handleSaveAttendance}><Save className="h-4 w-4 mr-2" /> Save Attendance</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyCourseDashboard;
