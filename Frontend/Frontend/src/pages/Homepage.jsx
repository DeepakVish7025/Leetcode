import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { Heart, Star, RefreshCcw, List, LayoutGrid, BarChart2, CheckCircle, Target, Signal, Dumbbell, BrainCircuit, ChevronRight, Code, Trophy, Tag, BarChart3, Users, Clock, Award, Zap, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturesSection from './hero';

// ===================================================================================
//  HELPER & SHARED COMPONENTS
// ===================================================================================

/**
 * Generic Icon Component
 */
const Icon = ({ d, pathProps, className, viewBox, isOutline, svgProps }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox={viewBox || "0 0 20 20"} 
        fill={isOutline ? "none" : "currentColor"} 
        stroke={isOutline ? "currentColor" : "none"} 
        strokeWidth={isOutline ? 1.5 : 0}
        className={className} 
        {...svgProps}
    >
        <path strokeLinecap="round" strokeLinejoin="round" {...pathProps} d={d} />
    </svg>
);

/**
 * Search Bar Component
 */
const SearchBar = ({ searchTerm, onSearchChange, placeholder, className }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-400 mb-1">
      Search
    </label>
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={searchTerm}
      onChange={onSearchChange}
      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-100 placeholder-gray-500"
    />
  </div>
);

/**
 * Dropdown Component
 */
const Dropdown = ({ label, options, selectedValue, onSelect, className }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-400 mb-1">
      {label}
    </label>
    <select
      value={selectedValue}
      onChange={(e) => onSelect(e.target.value)}
      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-100 appearance-none"
    >
      {options.map(option => (
        <option key={option.value} value={option.value} className="bg-gray-800 text-gray-100">{option.label}</option>
      ))}
    </select>
  </div>
);

// ===================================================================================
//  UI SECTION COMPONENTS
// ===================================================================================

/**
 * User Stats Component (Left Sidebar)
 */
const UserStats = ({ stats, onStatusChange, onDifficultyChange }) => {
  const ProgressBarStat = ({ value, total, colorClass, title, icon }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
      <button
        onClick={() => onDifficultyChange(title)}
        className="w-full text-left p-3 rounded-lg group hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <div className="mr-2">{icon}</div>
            <span className="font-semibold text-sm text-gray-200">{title}</span>
          </div>
          <span className="text-xs font-mono text-gray-400">{value}/{total}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className={`${colorClass} h-2 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
        </div>
      </button>
    );
  };

  return (
    <div className=" rounded-xl shadow-xl p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
        <BarChart2 size={22} className="mr-3 text-green-500" />
        My Stats
      </h3>
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400">Total Solved</p>
        <p className="text-5xl font-extrabold text-gray-200">
          {stats.solved}<span className="text-2xl font-medium text-gray-400">/{stats.total}</span>
        </p>
      </div>
      <div className="space-y-2">
        <button onClick={() => onStatusChange('Solved')} className="w-full flex justify-between items-center p-3 rounded-lg bg-gray-800/50 group transition-colors">
          <div className="flex items-center"><CheckCircle size={20} className="mr-3 text-green-500" /><span className="text-gray-200">Solved</span></div>
          <span className="font-bold text-gray-200">{stats.solved}</span>
        </button>
         <button onClick={() => onStatusChange('Attempted')} className="w-full flex justify-between items-center p-3 rounded-lg bg-gray-800/50 group transition-colors">
          <div className="flex items-center"><Target size={20} className="mr-3 text-yellow-500" /><span className="text-gray-200">Attempted</span></div>
          <span className="font-bold text-gray-200">{stats.attempted}</span>
        </button>
      </div>
      <div className="my-4 border-t border-gray-700"></div>
      <h4 className="font-semibold text-gray-200 mb-3">Difficulty Breakdown</h4>
      <div className="space-y-3">
        <ProgressBarStat title="Easy" icon={<Signal size={16} className="text-green-500" />} value={stats.solvedByDifficulty.Easy} total={stats.totalByDifficulty.Easy} onDifficultyChange={onDifficultyChange} colorClass="bg-green-500" />
        <ProgressBarStat title="Medium" icon={<Dumbbell size={16} className="text-yellow-500" />} value={stats.solvedByDifficulty.Medium} total={stats.totalByDifficulty.Medium} onDifficultyChange={onDifficultyChange} colorClass="bg-yellow-500" />
        <ProgressBarStat title="Hard" icon={<BrainCircuit size={16} className="text-red-500" />} value={stats.solvedByDifficulty.Hard} total={stats.totalByDifficulty.Hard} onDifficultyChange={onDifficultyChange} colorClass="bg-red-500" />
      </div>
    </div>
  );
};

/**
 * Problem Filters Component (Main Content Top)
 */
const ProblemFilters = ({ viewMode, setViewMode, noProblems, topics, difficulties, statuses, searchTerm, selectedTopic, selectedDifficulty, selectedStatus, onSearchChange, onTopicChange, onDifficultyChange, onStatusChange, onResetFilters }) => {
  const ViewToggleButton = ({ mode, currentMode, label, icon }) => (
    <button onClick={() => setViewMode(mode)} className={`p-1.5 rounded-md ${currentMode === mode ? 'bg-green-500 text-gray-900' : 'bg-transparent text-gray-400 hover:bg-gray-800'}`} aria-label={`Switch to ${label} view`}>
      {icon}
    </button>
  );

  return (
    <div className="p-6  rounded-xl shadow-xl border border-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-lg font-semibold text-gray-200">Filter & Sort <span className="text-sm font-normal text-gray-400">{`(${noProblems})`}</span></h2>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onResetFilters} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 transition-colors">
            <RefreshCcw size={16} />
          </button>
          <div className="flex items-center p-1 gap-1.5 bg-gray-800 rounded-lg border border-gray-700">
            <ViewToggleButton mode="list" currentMode={viewMode} label="List" icon={<List size={20} />} />
            <ViewToggleButton mode="grid" currentMode={viewMode} label="Grid" icon={<LayoutGrid size={20} />} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} className="sm:col-span-2 lg:col-span-4" placeholder="Search by title..." />
        <Dropdown label="Difficulty" options={difficulties} selectedValue={selectedDifficulty} onSelect={onDifficultyChange} className="w-full" />
        <Dropdown label="Status" options={statuses} selectedValue={selectedStatus} onSelect={onStatusChange} className="w-full" />
        <Dropdown label="Topic" options={topics} selectedValue={selectedTopic} onSelect={onTopicChange} className="w-full sm:col-span-2" />
      </div>
    </div>
  );
};

/**
 * Problems Table Component (List View)
 */
const ProblemsTable = ({ problems }) => {
  const difficultyStyles = { 
    Easy: 'bg-green-500/20 text-green-400 border-green-500/30', 
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', 
    Hard: 'bg-red-500/20 text-red-400 border-red-500/30' 
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved': return <Icon d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }} className="w-5 h-5 text-green-500" />;
      default: return <Icon d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }} className="w-5 h-5 text-gray-500" />;
    }
  };

  if (problems.length === 0) {
     return (
       <div className="text-center py-12 px-6  rounded-xl shadow-xl border border-gray-800">
         <h3 className="text-xl font-semibold text-gray-200">No Problems Found</h3>
         <p className="mt-1 text-sm text-gray-400">Try adjusting your filter criteria.</p>
       </div>
     );
  }

  return (
    <div className=" shadow-xl rounded-xl overflow-x-auto border border-gray-800">
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-800/50 text-gray-300">
          <tr>
            <th scope="col" className="px-6 py-4">Status</th>
            <th scope="col" className="px-6 py-4">Title</th>
            <th scope="col" className="px-6 py-4">Difficulty</th>
            <th scope="col" className="px-6 py-4">Topics</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4" title={problem.status}>{getStatusIcon(problem.status)}</td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
                <NavLink to={`/problem/${problem._id}`} className="hover:text-green-400 transition-colors">{problem.title}</NavLink>
              </th>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${difficultyStyles[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1.5">
                  {problem.tags.map((tag) => (
                    <span key={tag} className="bg-gray-800 px-2 py-0.5 text-xs rounded text-gray-300 border border-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Problem Card Component (for Grid View)
 */
const ProblemCard = ({ problem }) => {
    const getDifficultyClass = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-900/30 text-green-400 border-green-700';
            case 'Medium': return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
            case 'Hard': return 'bg-red-900/30 text-red-400 border-red-700';
            default: return 'bg-gray-800 text-gray-400 border-gray-700';
        }
    };
    
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Solved': return <Icon d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" pathProps={{ fillRule: 'evenodd', clipRule: 'evenodd' }} className="w-5 h-5 text-green-500" />;
            default: return <Icon d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" pathProps={{ fillRule: 'evenodd', clipRule: 'evenodd' }} className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <NavLink to={`/problem/${problem._id}`} className=" rounded-xl shadow-xl border border-gray-800 p-5 flex flex-col h-full transition-[transform,box-shadow] duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-green-500/30">
            <div className="flex items-start justify-between mb-3">
                <span className="font-semibold text-gray-400 text-sm">Problem</span>
                <div title={problem.status}>{getStatusIcon(problem.status)}</div>
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-200 mb-3">{problem.title}</h3>
            </div>
            <div className="flex-shrink-0">
                <div className="flex flex-wrap gap-2 mb-4">
                    {problem.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                            {tag}
                        </span>
                    ))}
                    {problem.tags.length > 2 && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                            +{problem.tags.length - 2}
                        </span>
                    )}
                </div>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full text-center border ${getDifficultyClass(problem.difficulty)}`}>
                    {problem.difficulty}
                </div>
            </div>
        </NavLink>
    );
};

/**
 * Problems Grid Component (Grid View)
 */


/**
 * Problems Grid Component (Grid View)
 */
const ProblemsGrid = ({ problems }) => {
  if (problems.length === 0) {
    return (
      <div className="text-center py-24 bg-gray-800 border border-gray-700 rounded-xl flex flex-col items-center justify-center">
        <p className="text-xl font-medium text-white">No Problems Found</p>
        <p className="mt-2 text-gray-400">Try selecting a different filter.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {problems.map((problem) => <ProblemCard key={problem._id} problem={problem} />)}
    </div>
  );
};


// ===================================================================================
//  MAIN HOMEPAGE COMPONENT
// ===================================================================================

function Homepage() {
  const CODE_BRACKET_ICON_PATH = "M14 6H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2zM9 13.5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm4 0a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm-2-3a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5z";
  const CHART_BAR_ICON_PATH = "M3 13h8V3H3v10zm0 4h8v-2H3v2zm10 0h8v-6h-8v6zm0-8h8V7h-8v2z";
  const TAG_ICON_PATH = "M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z";
  const TROPHY_ICON_PATH = "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z";

  // Feature Card Component
  const FeatureCard = ({ iconPath, title, description, gradient }) => (
  <div className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-purple-600 group">
    <div className={`p-3 rounded-full inline-flex items-center justify-center mb-6 bg-gradient-to-br ${gradient}`}>
      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // --- STATE MANAGEMENT ---
  const [problems, setProblems] = useState([]);
  
  const [solvedProblemIds, setSolvedProblemIds] = useState(new Set());
  const [filters, setFilters] = useState({ difficulty: 'All', tag: 'All', status: 'All', search: '' });
  const [viewMode, setViewMode] = useState('list');

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        // Standardize difficulty and tags on fetch
        const standardizedData = data.map(p => ({
            ...p,
            difficulty: p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1), // Capitalize (e.g., easy -> Easy)
            tags: Array.isArray(p.tags) ? p.tags : [p.tags] // Ensure tags is an array
        }));
        setProblems(standardizedData);
      } catch (error) { console.error('Error fetching problems:', error); }
    };

    const fetchSolvedProblems = async () => {
      if (!user) return;
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblemIds(new Set(data.map(p => p._id)));
      } catch (error) { console.error('Error fetching solved problems:', error);
        console.log("RESPONSE:", error?.response);
  console.log("STATUS:", error?.response?.status);
  console.log("MESSAGE:", error?.response?.data);
       }
    };

    fetchProblems();
    fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblemIds(new Set());
  };

  // --- DATA PREPARATION & FILTERING ---
  const filteredProblems = problems
    .map(p => ({ ...p, status: solvedProblemIds.has(p._id) ? 'Solved' : 'Todo' }))
    .filter(p => {
      const difficultyMatch = filters.difficulty === 'All' || p.difficulty === filters.difficulty;
      const tagMatch = filters.tag === 'All' || p.tags.includes(filters.tag);
      const statusMatch = filters.status === 'All' || p.status === filters.status;
      const searchMatch = p.title.toLowerCase().includes(filters.search.toLowerCase());
      return difficultyMatch && tagMatch && statusMatch && searchMatch;
    });

  // Data for UserStats component
  const userStats = {
    solved: solvedProblemIds.size,
    total: problems.length,
    attempted: 0, // Placeholder
    solvedByDifficulty: {
      Easy: problems.filter(p => p.difficulty === 'Easy' && solvedProblemIds.has(p._id)).length,
      Medium: problems.filter(p => p.difficulty === 'Medium' && solvedProblemIds.has(p._id)).length,
      Hard: problems.filter(p => p.difficulty === 'Hard' && solvedProblemIds.has(p._id)).length,
    },
    totalByDifficulty: {
      Easy: problems.filter(p => p.difficulty === 'Easy').length,
      Medium: problems.filter(p => p.difficulty === 'Medium').length,
      Hard: problems.filter(p => p.difficulty === 'Hard').length,
    },
  };

  // Data for Filter dropdowns
  const topics = [{ label: 'All Topics', value: 'All' }, ...Array.from(new Set(problems.flatMap(p => p.tags))).map(tag => ({ label: tag, value: tag }))];
  const difficulties = [{ label: 'All Difficulties', value: 'All' }, { label: 'Easy', value: 'Easy' }, { label: 'Medium', value: 'Medium' }, { label: 'Hard', value: 'Hard' }];
  const statuses = [{ label: 'All Statuses', value: 'All' }, { label: 'Solved', value: 'Solved' }, { label: 'Todo', value: 'Todo' }];

  const handleResetFilters = () => setFilters({ difficulty: 'All', tag: 'All', status: 'All', search: '' });

  // --- RENDER ---
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 space-y-8">
          <UserStats stats={userStats} onStatusChange={(status) => setFilters(prev => ({ ...prev, status }))} onDifficultyChange={(difficulty) => setFilters(prev => ({ ...prev, difficulty }))} />
        </aside>
        <main className="lg:col-span-9 space-y-8 ">
          <ProblemFilters
            viewMode={viewMode}
            setViewMode={setViewMode}
            noProblems={filteredProblems.length}
            topics={topics}
            difficulties={difficulties}
            statuses={statuses}
            searchTerm={filters.search}
            selectedTopic={filters.tag}
            selectedDifficulty={filters.difficulty}
            selectedStatus={filters.status}
            onSearchChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            onTopicChange={(topic) => setFilters(prev => ({ ...prev, tag: topic }))}
            onDifficultyChange={(difficulty) => setFilters(prev => ({ ...prev, difficulty }))}
            onStatusChange={(status) => setFilters(prev => ({ ...prev, status }))}
            onResetFilters={handleResetFilters}
          />
          {viewMode === 'list' ? <ProblemsTable problems={filteredProblems} /> : <ProblemsGrid problems={filteredProblems} />}
        </main>
      </div>

        
        

     <FeaturesSection/>

      
    </div>
  );
}

export default Homepage;