import React, { useState, useEffect, useCallback } from 'react';
import { NewsArticle, NewsCategory } from './types/news';
import { fetchNews } from './utils/newsApi';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import NewsList from './components/NewsList';
import { Newspaper } from 'lucide-react';

const categories: NewsCategory[] = [
  { id: 'headlines', name: 'Top Headlines', endpoint: 'top-headlines', color: 'from-blue-500 to-blue-600' },
  { id: 'technology', name: 'Technology', endpoint: 'technology', color: 'from-purple-500 to-purple-600' },
  { id: 'sports', name: 'Sports', endpoint: 'sports', color: 'from-green-500 to-green-600' },
  { id: 'entertainment', name: 'Entertainment', endpoint: 'entertainment', color: 'from-pink-500 to-pink-600' },
  { id: 'business', name: 'Business', endpoint: 'business', color: 'from-orange-500 to-orange-600' },
];

function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('headlines');
  const [searchQuery, setSearchQuery] = useState('');

  const loadNews = useCallback(async (category: string, query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchNews({
        category: category === 'headlines' ? 'headlines' : category,
        query: query.trim() || undefined,
      });
      
      setArticles(response.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews(activeCategory, searchQuery);
  }, [activeCategory, searchQuery, loadNews]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRetry = () => {
    loadNews(activeCategory, searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NewsHub</h1>
                <p className="text-sm text-gray-600">Stay informed, stay ahead</p>
              </div>
            </div>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : categories.find(cat => cat.id === activeCategory)?.name || 'News'}
              </h2>
              <p className="text-gray-600">
                {searchQuery
                  ? `Found ${articles.length} articles`
                  : 'Latest news and updates from trusted sources'}
              </p>
            </div>

            <NewsList
              articles={articles}
              loading={loading}
              error={error}
              onRetry={handleRetry}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">NewsHub</h3>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Your trusted source for breaking news, in-depth analysis, and comprehensive coverage 
            across technology, sports, business, and entertainment.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;