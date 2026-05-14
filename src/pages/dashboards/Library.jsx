import { useState, useEffect } from 'react';
import { api } from '../../store/authStore';
import { Search, Filter, Download, Book, FileText, Library as LibraryIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

const Library = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Mocking library fetch
    setTimeout(() => {
      setResources([
        {
          _id: '1',
          title: 'Introduction to Algorithms (4th Edition)',
          description: 'A comprehensive textbook on algorithms and data structures.',
          type: 'ebook',
          category: 'Computer Science',
          downloads: 1245,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Deep Residual Learning for Image Recognition',
          description: 'The original ResNet paper by Kaiming He et al.',
          type: 'research_paper',
          category: 'Artificial Intelligence',
          downloads: 856,
          createdAt: new Date(Date.now() - 864000000).toISOString()
        },
        {
          _id: '3',
          title: 'Data Structures Final Exam 2023',
          description: 'Previous year question paper for Data Structures.',
          type: 'question_paper',
          category: 'Computer Science',
          downloads: 320,
          createdAt: new Date(Date.now() - 1864000000).toISOString()
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleDownload = (id) => {
    toast.success('Download started! (Mock)');
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || res.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getIcon = (type) => {
    switch(type) {
      case 'ebook': return <Book className="h-8 w-8 text-primary" />;
      case 'research_paper': return <LibraryIcon className="h-8 w-8 text-emerald-500" />;
      case 'question_paper': return <FileText className="h-8 w-8 text-amber-500" />;
      default: return <FileText className="h-8 w-8 text-text-muted" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Digital Library</h2>
        <div className="flex w-full md:w-auto space-x-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-surface border border-border text-text-primary rounded-xl focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'ebook', 'research_paper', 'question_paper', 'notes'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeTab === tab 
                ? 'bg-primary text-text-inverse shadow-sm' 
                : 'bg-surface border border-border text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {tab.replace('_', ' ').charAt(0).toUpperCase() + tab.replace('_', ' ').slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => <div key={i} className="h-40 bg-surface-hover rounded-2xl animate-pulse"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource._id} className="card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-surface-hover rounded-xl border border-border group-hover:border-primary/30 transition-colors">
                    {getIcon(resource.type)}
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-1 bg-surface border border-border text-text-muted rounded-full">
                    {resource.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors" title={resource.title}>
                  {resource.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                  {resource.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-xs font-medium text-text-muted">{resource.downloads} downloads</span>
                <Button size="sm" variant="outline" onClick={() => handleDownload(resource._id)} className="text-primary border-primary/20 hover:bg-primary/10">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </div>
          ))}
          {filteredResources.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-muted">
              <LibraryIcon className="mx-auto h-12 w-12 text-text-muted/50 mb-3" />
              <p>No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Library;
