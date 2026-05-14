import { useState, useEffect } from 'react';
import { api } from '../../store/authStore';
import { CheckSquare, Clock, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mocking quiz fetch
    setTimeout(() => {
      setQuizzes([
        {
          _id: '1',
          title: 'React Hooks Mastery',
          courseName: 'Advanced React',
          durationMinutes: 30,
          totalQuestions: 15,
          status: 'available'
        },
        {
          _id: '2',
          title: 'JavaScript Basics',
          courseName: 'Intro to JS',
          durationMinutes: 15,
          totalQuestions: 10,
          status: 'completed',
          score: 8
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTakeQuiz = (id) => {
    toast('Quiz started! (Mock)', { icon: '🚀' });
  };

  if (loading) return <div className="animate-pulse p-4 text-text-muted">Loading quizzes...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary tracking-tight">My Quizzes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="card p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl ${quiz.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                  <CheckSquare className="h-6 w-6" />
                </div>
                {quiz.status === 'completed' && (
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold rounded-full">
                    Score: {quiz.score}/{quiz.totalQuestions}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg text-text-primary mb-1">{quiz.title}</h3>
              <p className="text-sm text-text-secondary mb-4">{quiz.courseName}</p>
              
              <div className="flex items-center space-x-4 text-sm text-text-muted mb-6">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> {quiz.durationMinutes} min
                </span>
                <span>•</span>
                <span>{quiz.totalQuestions} Questions</span>
              </div>
            </div>

            {quiz.status === 'available' ? (
              <Button onClick={() => handleTakeQuiz(quiz._id)} className="w-full">
                <Play className="mr-2 h-4 w-4" /> Take Quiz
              </Button>
            ) : (
              <Button variant="outline" className="w-full text-emerald-500 border-emerald-500/20 bg-emerald-500/5 cursor-not-allowed" disabled>
                Completed
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
