import React from 'react';
import { NewsArticle } from '../types/news';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface NewsListProps {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const NewsList: React.FC<NewsListProps> = ({ articles, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingSpinner />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="flex gap-4 mb-3">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-28"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search terms or selecting a different category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
};

export default NewsList;