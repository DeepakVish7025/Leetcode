import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Clock, Trophy, Code, Calendar, Users, ChevronRight, Plus, X, Edit2, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import Loader from '../components/Loader';

function Contest() {
  const { user } = useSelector((state) => state.auth);
  const [contests, setContests] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form state for creating/editing contests
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    duration: 60,
    problems: [],
    maxParticipants: 1000
  });

  const isAdmin = user?.role === 'admin';

  // Load initial data
  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const savedContests = localStorage.getItem('contests');
      if (savedContests) {
        setContests(JSON.parse(savedContests));
      } else {
        // Demo contests if none exist
        const demoContests = [
          {
            id: 1,
            title: 'Weekly Contest 420',
            description: 'Solve algorithmic problems and compete with coders worldwide',
            startTime: new Date(Date.now() + 3600000).toISOString(),
            duration: 90,
            status: 'upcoming',
            participants: 243,
            maxParticipants: 1000,
            registeredUsers: [],
            problems: [
              { id: 1, title: 'Two Sum Variant', difficulty: 'Easy', points: 100 },
              { id: 2, title: 'Binary Tree Traversal', difficulty: 'Medium', points: 200 },
              { id: 3, title: 'Dynamic Programming Challenge', difficulty: 'Hard', points: 300 }
            ]
          },
          {
            id: 2,
            title: 'Biweekly Contest 140',
            description: 'Challenge yourself with advanced data structures and algorithms',
            startTime: new Date(Date.now() + 86400000).toISOString(),
            duration: 120,
            status: 'upcoming',
            participants: 189,
            maxParticipants: 1000,
            registeredUsers: [],
            problems: [
              { id: 4, title: 'Array Manipulation', difficulty: 'Easy', points: 100 },
              { id: 5, title: 'Graph Algorithms', difficulty: 'Medium', points: 200 },
              { id: 6, title: 'String Processing', difficulty: 'Medium', points: 200 },
              { id: 7, title: 'Advanced DP', difficulty: 'Hard', points: 400 }
            ]
          }
        ];
        setContests(demoContests);
        localStorage.setItem('contests', JSON.stringify(demoContests));
      }
      setLoading(false);
    }, 1000);
  };

  const saveContests = (updatedContests) => {
    setContests(updatedContests);
    localStorage.setItem('contests', JSON.stringify(updatedContests));
  };

  const getContestStatus = (contest) => {
    const now = new Date();
    const start = new Date(contest.startTime);
    const end = new Date(start.getTime() + contest.duration * 60000);

    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'live';
    return 'ended';
  };

  const getTimeUntilStart = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = start - now;

    if (diff <= 0) return 'Started';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const [timers, setTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      contests.forEach(contest => {
        newTimers[contest.id] = getTimeUntilStart(contest.startTime);
      });
      setTimers(newTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [contests]);

  const handleCreateContest = () => {
    if (!formData.title || !formData.startTime) {
      alert('Please fill in all required fields');
      return;
    }

    const newContest = {
      id: Date.now(),
      ...formData,
      participants: 0,
      registeredUsers: [],
      leaderboard: []
    };

    const updatedContests = [...contests, newContest];
    saveContests(updatedContests);
    setShowCreateModal(false);
    resetForm();
    alert('Contest created successfully! ✅');
  };

  const handleUpdateContest = () => {
    const updatedContests = contests.map(c => 
      c.id === selectedContest.id ? { ...c, ...formData } : c
    );
    saveContests(updatedContests);
    setShowCreateModal(false);
    setSelectedContest(null);
    resetForm();
    alert('Contest updated successfully! ✅');
  };

  const handleDeleteContest = (id) => {
    if (window.confirm('Are you sure you want to delete this contest?')) {
      const updatedContests = contests.filter(c => c.id !== id);
      saveContests(updatedContests);
    }
  };

  const handleRegister = (contestId) => {
    const contest = contests.find(c => c.id === contestId);
    if (contest.registeredUsers?.includes(user.username)) {
      alert('You are already registered for this contest!');
      return;
    }

    const updatedContests = contests.map(c => {
      if (c.id === contestId) {
        return {
          ...c,
          participants: c.participants + 1,
          registeredUsers: [...(c.registeredUsers || []), user.username]
        };
      }
      return c;
    });
    
    saveContests(updatedContests);
    alert('Successfully registered for the contest! 🎉');
  };

  const isUserRegistered = (contest) => {
    return contest.registeredUsers?.includes(user?.username);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startTime: '',
      duration: 60,
      problems: [],
      maxParticipants: 1000
    });
  };

  const openEditModal = (contest) => {
    setSelectedContest(contest);
    setFormData({
      title: contest.title,
      description: contest.description,
      startTime: contest.startTime,
      duration: contest.duration,
      problems: contest.problems || [],
      maxParticipants: contest.maxParticipants
    });
    setShowCreateModal(true);
  };

  const addProblem = () => {
    setFormData({
      ...formData,
      problems: [
        ...formData.problems,
        { id: Date.now(), title: '', difficulty: 'Easy', points: 100 }
      ]
    });
  };

  const updateProblem = (index, field, value) => {
    const updatedProblems = [...formData.problems];
    updatedProblems[index][field] = value;
    setFormData({ ...formData, problems: updatedProblems });
  };

  const removeProblem = (index) => {
    setFormData({
      ...formData,
      problems: formData.problems.filter((_, i) => i !== index)
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'upcoming':
        return <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/50 text-xs font-medium rounded-full">Upcoming</span>;
      case 'live':
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/50 text-xs font-medium rounded-full animate-pulse">Live Now</span>;
      case 'ended':
        return <span className="px-3 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/50 text-xs font-medium rounded-full">Ended</span>;
      default:
        return null;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-700 rounded-lg">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Contest Arena</h1>
                <p className="text-gray-400 mt-1">Compete, solve, and rise up the leaderboard</p>
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Contest
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          {contests.map(contest => {
            const status = getContestStatus(contest);
            const userRegistered = isUserRegistered(contest);
            
            return (
              <div key={contest.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition group">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold group-hover:text-purple-400 transition">{contest.title}</h2>
                        {getStatusBadge(status)}
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{contest.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(contest.startTime).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{contest.duration} mins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{contest.participants} participants</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      {isAdmin ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(contest)}
                            className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                            title="Edit Contest"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteContest(contest.id)}
                            className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                            title="Delete Contest"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <>
                          {status === 'upcoming' && (
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-1">Starts in</p>
                              <p className="font-mono font-bold text-lg text-blue-400">
                                {timers[contest.id] || '--:--:--'}
                              </p>
                            </div>
                          )}
                          
                          {status === 'live' && (
                            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center gap-2">
                              Enter Contest
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}

                          {status === 'upcoming' && !userRegistered && (
                            <button
                              onClick={() => handleRegister(contest.id)}
                              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                            >
                              Register
                            </button>
                          )}

                          {status === 'upcoming' && userRegistered && (
                            <div className="flex items-center gap-2 text-green-400 px-4 py-2 bg-green-400/10 rounded-lg">
                              <CheckCircle className="w-5 h-5" />
                              <span className="font-medium">Registered</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {contests.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-400">No contests available</h3>
              <p className="text-gray-500 mt-2">Check back later for upcoming contests!</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Contest Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700 shadow-xl">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-gray-800 z-10">
              <h2 className="text-xl font-bold">
                {selectedContest ? 'Edit Contest' : 'Create New Contest'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setSelectedContest(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Contest Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition"
                  placeholder="e.g. Weekly Contest 101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition h-24 resize-none"
                  placeholder="What is this contest about?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Start Time</label>
                  <input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition"
                    min="1"
                  />
                </div>
              </div>

              {/* Problem Management in Create Modal */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-400">Contest Problems</label>
                  <button
                    onClick={addProblem}
                    className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Problem
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.problems.map((problem, idx) => (
                    <div key={problem.id || idx} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-gray-500 font-mono text-sm">#{idx + 1}</span>
                        <input
                          type="text"
                          value={problem.title}
                          onChange={(e) => updateProblem(idx, 'title', e.target.value)}
                          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm focus:border-purple-500 outline-none"
                          placeholder="Problem Title"
                        />
                        <button
                          onClick={() => removeProblem(idx)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={problem.difficulty}
                          onChange={(e) => updateProblem(idx, 'difficulty', e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm outline-none"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                        <input
                          type="number"
                          value={problem.points}
                          onChange={(e) => updateProblem(idx, 'points', parseInt(e.target.value))}
                          className="w-24 bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm outline-none"
                          placeholder="Points"
                        />
                      </div>
                    </div>
                  ))}
                  {formData.problems.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-gray-700 rounded-lg">
                      <p className="text-gray-500 text-sm">No problems added yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex justify-end gap-3 sticky bottom-0 bg-gray-800">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={selectedContest ? handleUpdateContest : handleCreateContest}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition"
              >
                {selectedContest ? 'Update Contest' : 'Create Contest'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contest;