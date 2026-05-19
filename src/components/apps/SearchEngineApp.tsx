'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, SKILLS, EDUCATION } from '@/data/portfolio';

export default function SearchEngineApp() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(false);
    
    try {
      // Fetch real web results from Wikipedia API
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`);
      const data = await res.json();
      
      const realResults = data.query.search.map((item: any) => ({
        type: 'Web Result',
        title: item.title,
        desc: item.snippet.replace(/<[^>]*>?/gm, ''), // Strip HTML tags
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`
      }));

      // Mix with portfolio results if any match
      const portfolioResults = getPortfolioResults();
      setSearchResults([...portfolioResults, ...realResults]);
    } catch (error) {
      console.error("Search failed", error);
      setSearchResults(getPortfolioResults());
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const getPortfolioResults = () => {
    const q = query.toLowerCase();
    const results: any[] = [];

    // Search Projects
    PROJECTS.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q))) {
        results.push({ type: 'Project', title: p.title, desc: p.description, url: p.url, category: p.category });
      }
    });

    // Search Skills
    Object.entries(SKILLS).forEach(([cat, skills]) => {
      if (cat.toLowerCase().includes(q) || (skills as string[]).some(s => s.toLowerCase().includes(q))) {
        results.push({ type: 'Skill Category', title: cat, desc: `Skills: ${(skills as string[]).join(', ')}` });
      }
    });

    // Search Education
    EDUCATION.forEach(e => {
      if (e.degree.toLowerCase().includes(q) || e.institution.toLowerCase().includes(q)) {
        results.push({ type: 'Education', title: e.degree, desc: `${e.institution} (${e.period})` });
      }
    });

    return results;
  };

  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden font-sans">
      {/* Top Bar (Google Style) */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <div className="flex items-center gap-6 w-full max-w-3xl">
          {hasSearched && (
            <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => { setHasSearched(false); setQuery(''); }}>
              <span className="text-blue-500">R</span>
              <span className="text-red-500">a</span>
              <span className="text-yellow-500">v</span>
              <span className="text-blue-500">i</span>
              <span className="text-green-500">O</span>
              <span className="text-red-500">S</span>
            </div>
          )}
          
          {hasSearched && (
            <form onSubmit={handleSearch} className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-gray-300 rounded-full px-5 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition-shadow focus:shadow-md"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 text-lg">
                🔍
              </button>
            </form>
          )}
        </div>
        <div className="flex items-center gap-4 shrink-0 ml-4">
          <a href="https://github.com/raviraj82891" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline">GitHub</a>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">R</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {!hasSearched ? (
            <motion.div
              key="home"
              className="absolute inset-0 flex flex-col items-center justify-center pb-32 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            >
              <div className="text-6xl sm:text-7xl font-bold tracking-tighter mb-8 select-none">
                <span className="text-blue-500">R</span>
                <span className="text-red-500">a</span>
                <span className="text-yellow-500">v</span>
                <span className="text-blue-500">i</span>
                <span className="text-green-500">O</span>
                <span className="text-red-500">S</span>
              </div>
              
              <form onSubmit={handleSearch} className="w-full max-w-xl relative mb-8 group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 group-hover:border-gray-300 focus:border-gray-300 rounded-full pl-11 pr-5 py-3.5 text-base text-gray-800 shadow-[0_1px_6px_rgba(32,33,36,0.1)] outline-none transition-shadow focus:shadow-[0_1px_8px_rgba(32,33,36,0.2)]"
                  placeholder="Search portfolio or web..."
                  autoFocus
                />
              </form>

              <div className="flex gap-3">
                <button onClick={handleSearch} className="bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 text-gray-700 px-4 py-2 rounded text-sm transition-colors">
                  Ravi Search
                </button>
                <button onClick={() => window.open(`https://google.com/search?q=${encodeURIComponent(query || 'Raviraj Sharma')}`)} className="bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 text-gray-700 px-4 py-2 rounded text-sm transition-colors">
                  I'm Feeling Lucky
                </button>
              </div>

              <div className="mt-8 text-xs text-gray-500">
                Search engine offered in: <span className="text-blue-600 hover:underline cursor-pointer">English</span> <span className="text-blue-600 hover:underline cursor-pointer">C++</span> <span className="text-blue-600 hover:underline cursor-pointer">Python</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="max-w-3xl mx-auto px-6 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {isSearching ? (
                <div className="flex items-center gap-3 text-gray-500 mt-4">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  Searching Raviraj's OS...
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-500 mb-6">
                    About {searchResults.length} results (fetched in real-time)
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <div className="space-y-8 pb-12">
                      {searchResults.map((res, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                          <div className="text-sm text-gray-800 mb-1 flex items-center gap-2">
                            {res.url ? <span className="truncate max-w-[300px] text-gray-600">{res.url}</span> : <span className="text-gray-600">portfolio://{res.type.toLowerCase().replace(' ', '-')}</span>}
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{res.type}</span>
                          </div>
                          {res.url ? (
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-xl text-blue-800 hover:underline inline-block mb-1">
                              {res.title}
                            </a>
                          ) : (
                            <h3 className="text-xl text-blue-800 mb-1">{res.title}</h3>
                          )}
                          <p className="text-sm text-gray-600 leading-relaxed">{res.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8 text-gray-800">
                      <p className="text-lg mb-4">Your search - <span className="font-bold">{query}</span> - did not match any documents in the portfolio.</p>
                      <p className="mb-2">Suggestions:</p>
                      <ul className="list-disc pl-8 space-y-1 text-sm">
                        <li>Make sure all words are spelled correctly.</li>
                        <li>Try different keywords.</li>
                        <li>Try more general keywords.</li>
                        <li><a href={`https://google.com/search?q=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Search the entire web for "{query}" instead ↗</a></li>
                      </ul>
                    </div>
                  )}

                  {/* Always show web search fallback */}
                  {searchResults.length > 0 && (
                    <div className="mt-12 pt-6 border-t border-gray-200">
                      <p className="text-gray-600 mb-3">Looking for something else?</p>
                      <a href={`https://google.com/search?q=${encodeURIComponent(query)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full text-sm font-medium transition-colors">
                        <span>🔍</span>
                        Search Google for "{query}"
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
