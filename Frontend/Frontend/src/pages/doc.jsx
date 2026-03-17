import React, { useState } from 'react';
import { Menu, X, ChevronRight, Book, Code, Trophy, GraduationCap, MessageSquare, Users, Shield, FileText, Award, Target } from 'lucide-react';

export default function DocumentationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Book },
    { id: 'objectives', title: 'Key Objectives', icon: Target },
    { id: 'user-roles', title: 'User Roles', icon: Users },
    { id: 'authentication', title: 'Authentication', icon: Shield },
    { id: 'problems', title: 'Problem Solving', icon: Code },
    { id: 'editor', title: 'Code Editor', icon: FileText },
    { id: 'ai-interview', title: 'AI Interview', icon: MessageSquare },
    { id: 'courses', title: 'Course Section', icon: GraduationCap },
    { id: 'certificates', title: 'Certificates', icon: Award },
    { id: 'contests', title: 'Contest Module', icon: Trophy },
    { id: 'leaderboard', title: 'Leaderboard', icon: Users },
    { id: 'admin', title: 'Admin Panel', icon: Shield },
    { id: 'tech-stack', title: 'Technology Stack', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      {/* <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 px-2 py-1 rounded font-bold text-sm">
                &lt;CM&gt;
              </div>
              <h1 className="text-xl font-semibold">CodeMaster</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-orange-500 transition">Problems</a>
            <a href="#" className="hover:text-orange-500 transition">Contests</a>
            <a href="#" className="hover:text-orange-500 transition">Leaderboard</a>
            <a href="#" className="hover:text-orange-500 transition">Courses</a>
            <a href="#" className="hover:text-orange-500 transition">Interview</a>
          </nav>
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>
      </header> */}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:sticky lg:translate-x-0 top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-gray-800 border-r border-gray-700 overflow-y-auto transition-transform duration-300 z-40`}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-orange-500">Documentation</h2>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
                      activeSection === section.id
                        ? 'bg-gray-700 text-orange-500'
                        : 'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                    <ChevronRight
                      size={16}
                      className={`ml-auto transition ${
                        activeSection === section.id ? 'text-orange-500' : 'text-gray-500'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-5xl">
          {activeSection === 'introduction' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Introduction</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  CodeMaster is a full-stack coding practice and learning platform inspired by LeetCode, designed to help users master <span className="text-orange-500 font-semibold">Data Structures & Algorithms, SQL, and Problem-Solving skills</span> in a structured, practical, and interactive way.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The platform combines coding practice, learning resources, contests, AI-powered interview preparation, and performance tracking into a single ecosystem.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  CodeMaster is built with a modern tech stack and focuses on <span className="text-orange-500 font-semibold">real-world interview preparation</span>, making it suitable for students, freshers, and working professionals.
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-orange-500">CodeMaster Mission</h3>
                <p className="text-gray-300 italic">Learn. Practice. Compete. Succeed.</p>
              </div>
            </div>
          )}

          {activeSection === 'objectives' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Key Objectives</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="grid gap-4">
                {[
                  'Provide a centralized platform for coding practice and learning',
                  'Help users prepare for technical interviews effectively',
                  'Track user progress and performance',
                  'Offer AI-based mock interview experience',
                  'Enable administrators to manage problems, courses, and content easily'
                ].map((obj, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-start gap-3">
                    <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-gray-300">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'user-roles' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">User Roles</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Normal User</h3>
                  <p className="text-gray-300 mb-4">A normal user can:</p>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Register and log in securely</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Solve coding problems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Track solved problems and progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Participate in contests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>View leaderboard rankings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Access courses and learning paths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Attempt AI-based interviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Earn certificates after course completion</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Admin User</h3>
                  <p className="text-gray-300 mb-4">An admin has access to a dedicated admin panel and can:</p>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Add, update, and delete problems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Upload editorials and explanations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Create and manage courses</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Track user progress and engagement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Manage contests and leaderboard data</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'authentication' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Authentication System</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  CodeMaster provides a <span className="text-orange-500 font-semibold">secure authentication system</span> with the following features:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {['User Registration (Sign Up)', 'User Login', 'JWT-based authentication', 'Protected routes for users and admins', 'Secure logout functionality'].map((feature, idx) => (
                    <div key={idx} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                      <div className="flex items-center gap-2">
                        <Shield size={18} className="text-orange-500" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Authentication ensures that only authorized users can access protected features such as problem solving, courses, and admin actions.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'problems' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Problem Solving Module</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Problem Categories</h3>
                  <p className="text-gray-300 mb-4">CodeMaster offers a wide variety of problems, including:</p>
                  <div className="grid md:grid-cols-3 gap-3">
                    {['Data Structures & Algorithms', 'SQL Problems', 'Logical Questions'].map((cat, idx) => (
                      <div key={idx} className="bg-gray-700 rounded-lg p-4 text-center border border-gray-600">
                        <Code className="mx-auto mb-2 text-orange-500" size={24} />
                        <span className="text-sm text-gray-300">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Problem Features</h3>
                  <p className="text-gray-300 mb-4">Each problem includes:</p>
                  <div className="space-y-2 text-gray-300">
                    {['Problem statement', 'Difficulty level (Easy, Medium, Hard)', 'Tags (Array, DP, SQL, etc.)', 'Code editor', 'Test cases', 'Submission and evaluation'].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ChevronRight size={16} className="text-orange-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300 mt-4">
                    Users can view their <span className="text-orange-500 font-semibold">solved and unsolved problems</span>, helping them track progress effectively.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'editor' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Code Editor</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 mb-4">The integrated code editor allows users to:</p>
                <div className="space-y-3">
                  {[
                    'Write and test code directly on the platform',
                    'Solve problems in supported languages',
                    'Submit solutions for evaluation'
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 flex items-start gap-3">
                      <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-gray-300">
                    This provides a <span className="text-orange-500 font-semibold">real coding interview-like experience</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ai-interview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">AI Interview Module</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 mb-6">
                  One of the unique features of CodeMaster is the <span className="text-orange-500 font-semibold">AI Interview Attempt</span> system.
                </p>
                <h3 className="text-lg font-semibold mb-4 text-orange-500">Features:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Simulated Interview', desc: 'Technical interview experience' },
                    { title: 'AI-Generated Questions', desc: 'Dynamic problem sets' },
                    { title: 'Assessment', desc: 'Logical and problem-solving evaluation' },
                    { title: 'Build Confidence', desc: 'Prepare for real interviews' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      <MessageSquare className="text-orange-500 mb-2" size={20} />
                      <h4 className="font-semibold text-gray-100 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'courses' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Course Section</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Courses Overview</h3>
                  <p className="text-gray-300 mb-4">
                    CodeMaster offers structured courses designed for interview preparation and skill building.
                  </p>
                  <p className="text-gray-300 mb-3">Each course may include:</p>
                  <div className="space-y-2">
                    {['Video or textual lessons', 'Practice problems', 'Progress tracking', 'Completion milestones'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300">
                        <GraduationCap size={16} className="text-orange-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-orange-500">Course Tracking</h3>
                  <div className="space-y-3">
                    {[
                      'Users can track their course progress',
                      'Completed modules are marked automatically',
                      'Progress is saved in the user profile'
                    ].map((item, idx) => (
                      <div key={idx} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600 flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'certificates' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Certificates</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 mb-6">
                  After successful completion of a course, users can:
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Award, text: 'Receive a platform-generated certificate' },
                    { icon: FileText, text: 'Use the certificate for learning proof' },
                    { icon: Users, text: 'Add it to resumes or LinkedIn profiles' }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="bg-gray-700 rounded-lg p-4 border border-gray-600 flex items-center gap-4">
                        <div className="bg-orange-500/20 rounded-lg p-3">
                          <Icon className="text-orange-500" size={24} />
                        </div>
                        <span className="text-gray-300">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'contests' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Contest Module</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 mb-6">
                  CodeMaster organizes coding contests similar to competitive programming platforms.
                </p>
                <h3 className="text-lg font-semibold mb-4 text-orange-500">Contest Features:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Time-bound contests', icon: Trophy },
                    { title: 'Multiple problems', icon: Code },
                    { title: 'Live participation', icon: Users },
                    { title: 'Automatic ranking', icon: Award }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="bg-gray-700 rounded-lg p-4 border border-gray-600 flex items-center gap-3">
                        <Icon className="text-orange-500" size={20} />
                        <span className="text-gray-300">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'leaderboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <p className="text-gray-300 mb-4">The leaderboard displays:</p>
                <div className="space-y-3">
                  {[
                    'User rankings based on performance',
                    'Contest scores',
                    'Overall platform performance'
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 flex items-start gap-3">
                      <div className="bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold">{idx + 1}</span>
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg p-4">
                  <p className="text-gray-300">
                    This feature motivates users through <span className="text-orange-500 font-semibold">healthy competition</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'admin' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <p className="text-gray-300 mb-6">
                    The Admin Panel is accessible <span className="text-orange-500 font-semibold">only to admin users</span> and includes:
                  </p>
                  <h3 className="text-lg font-semibold mb-4 text-orange-500">Admin Capabilities:</h3>
                  <div className="grid gap-3">
                    {[
                      'Upload new problems',
                      'Edit existing problems',
                      'Delete problems',
                      'Upload editorials',
                      'Create and manage courses',
                      'Monitor user activity and progress'
                    ].map((capability, idx) => (
                      <div key={idx} className="bg-gray-700 rounded-lg p-3 border border-gray-600 flex items-center gap-3">
                        <Shield className="text-orange-500" size={18} />
                        <span className="text-gray-300">{capability}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300 mt-6">
                    This ensures smooth content management and platform scalability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'tech-stack' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">Technology Stack</h1>
                <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { tech: 'Frontend', value: 'React.js' },
                    { tech: 'Backend', value: 'Node.js, Express.js' },
                    { tech: 'Database', value: 'MongoDB' },
                    { tech: 'Authentication', value: 'JWT' },
                    { tech: 'Caching & Security', value: 'Redis' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="text-orange-500" size={18} />
                        <h4 className="font-semibold text-gray-100">{item.tech}</h4>
                      </div>
                      <p className="text-gray-400">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">CodeMaster</h2>
                <p className="text-xl text-orange-500 font-semibold">Learn. Practice. Compete. Succeed.</p>
              </div>

            </div>
            )}
        </main>
        </div>
    </div>
    );
}

