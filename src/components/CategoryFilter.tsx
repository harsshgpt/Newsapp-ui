import React from 'react';
import { NewsCategory } from '../types/news';

interface CategoryFilterProps {
  categories: NewsCategory[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-sm sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
              activeCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;