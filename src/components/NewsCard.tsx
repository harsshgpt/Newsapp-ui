import React from 'react';
import { ExternalLink, Clock, User } from 'lucide-react';
import { NewsArticle } from '../types/news';
import { formatTimeAgo } from '../utils/dateHelpers';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const handleReadMore = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={article.urlToImage || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs font-medium">
          {article.source.name}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>
          {article.author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="truncate">{article.author}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug line-clamp-2">
          {article.title}
        </h3>
        
        {article.description && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        )}
        
        <button
          onClick={handleReadMore}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group/button"
        >
          <span>Read More</span>
          <ExternalLink className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;