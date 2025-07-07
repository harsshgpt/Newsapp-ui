import { NewsResponse, NewsError } from '../types/news';

const API_KEY = 'YOUR_NEWSAPI_KEY';
const BASE_URL = 'https://newsapi.org/v2';

interface FetchNewsParams {
  category?: string;
  query?: string;
  pageSize?: number;
  page?: number;
}

export const fetchNews = async (params: FetchNewsParams = {}): Promise<NewsResponse> => {
  const { category, query, pageSize = 20, page = 1 } = params;
  
  let endpoint = `${BASE_URL}/everything`;
  const searchParams = new URLSearchParams({
    apiKey: API_KEY,
    pageSize: pageSize.toString(),
    page: page.toString(),
    sortBy: 'publishedAt',
    language: 'en',
  });

  if (category && category !== 'headlines') {
    endpoint = `${BASE_URL}/top-headlines`;
    searchParams.append('category', category);
    searchParams.append('country', 'us');
  } else if (category === 'headlines') {
    endpoint = `${BASE_URL}/top-headlines`;
    searchParams.append('country', 'us');
  }

  if (query) {
    searchParams.append('q', query);
  }

  // For demo purposes, we'll use a mock response since we don't have a real API key
  if (API_KEY === 'YOUR_NEWSAPI_KEY') {
    return getMockNewsData(category, query);
  }

  try {
    const response = await fetch(`${endpoint}?${searchParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch news');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch news');
  }
};

const getMockNewsData = (category?: string, query?: string): NewsResponse => {
  const mockArticles = [
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Sarah Johnson',
      title: 'Revolutionary AI Technology Transforms Healthcare Industry',
      description: 'New breakthrough in artificial intelligence promises to revolutionize medical diagnosis and treatment planning across hospitals worldwide.',
      url: 'https://example.com/ai-healthcare',
      urlToImage: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      content: null
    },
    {
      source: { id: 'bbc-sport', name: 'BBC Sport' },
      author: 'Mike Thompson',
      title: 'Championship Final Breaks Attendance Records',
      description: 'Historic sporting event draws unprecedented crowds as millions tune in worldwide to witness the thrilling conclusion.',
      url: 'https://example.com/championship-final',
      urlToImage: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      content: null
    },
    {
      source: { id: 'business-insider', name: 'Business Insider' },
      author: 'Emily Chen',
      title: 'Global Markets Surge Following Economic Recovery Signs',
      description: 'Stock markets worldwide experience significant gains as economists report positive indicators for sustained economic growth.',
      url: 'https://example.com/markets-surge',
      urlToImage: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      content: null
    },
    {
      source: { id: 'entertainment-weekly', name: 'Entertainment Weekly' },
      author: 'David Martinez',
      title: 'Blockbuster Film Premiers to Critical Acclaim',
      description: 'Latest cinematic release receives overwhelming positive reviews from critics and audiences alike, setting new box office records.',
      url: 'https://example.com/blockbuster-film',
      urlToImage: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      content: null
    },
    {
      source: { id: 'wired', name: 'Wired' },
      author: 'Lisa Park',
      title: 'Breakthrough in Quantum Computing Achieved',
      description: 'Scientists announce major advancement in quantum processing power, bringing us closer to practical quantum computers.',
      url: 'https://example.com/quantum-computing',
      urlToImage: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      content: null
    },
    {
      source: { id: 'espn', name: 'ESPN' },
      author: 'Robert Wilson',
      title: 'Olympic Preparations Intensify as Games Approach',
      description: 'Athletes from around the world make final preparations as the upcoming Olympic Games promise to be the most competitive yet.',
      url: 'https://example.com/olympic-preparations',
      urlToImage: 'https://images.pexels.com/photos/261409/pexels-photo-261409.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      content: null
    }
  ];

  let filteredArticles = mockArticles;

  if (category && category !== 'headlines') {
    filteredArticles = mockArticles.filter(article => {
      const categoryMap: { [key: string]: string[] } = {
        technology: ['techcrunch', 'wired'],
        sports: ['bbc-sport', 'espn'],
        business: ['business-insider'],
        entertainment: ['entertainment-weekly']
      };
      return categoryMap[category]?.includes(article.source.id || '');
    });
  }

  if (query) {
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description?.toLowerCase().includes(query.toLowerCase())
    );
  }

  return {
    status: 'ok',
    totalResults: filteredArticles.length,
    articles: filteredArticles
  };
};