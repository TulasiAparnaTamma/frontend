import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { api } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(2, 'Category is required'),
});

const CreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(courseSchema)
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await api.post('/courses', {
        ...data,
        status: 'published', // auto-publish for demo purposes
        modules: [] // start empty
      });
      toast.success('Course created successfully!');
      navigate('/dashboard'); // go back to faculty dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create course');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 card p-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Create New Course</h2>
        <p className="text-text-secondary text-sm mt-1">Fill in the details below to publish a new course.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-bold tracking-widest uppercase text-text-secondary mb-2">Course Title</label>
          <Input 
            {...register('title')} 
            placeholder="e.g. Advanced React Patterns"
            error={errors.title?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-bold tracking-widest uppercase text-text-secondary mb-2">Category</label>
          <select 
            {...register('category')}
            className="w-full flex h-10 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all appearance-none"
          >
            <option value="">Select a category</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Literature">Literature</option>
            <option value="Business">Business</option>
          </select>
          {errors.category && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold tracking-widest uppercase text-text-secondary mb-2">Description</label>
          <textarea
            {...register('description')}
            rows="5"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
            placeholder="Detailed description of what students will learn..."
          ></textarea>
          {errors.description && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.description.message}</p>}
        </div>

        <div className="pt-4 flex space-x-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>Publish Course</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
