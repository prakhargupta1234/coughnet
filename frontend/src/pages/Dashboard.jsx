import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Microscope, 
  History, 
  Info, 
  HelpCircle, 
  LogOut, 
  User, 
  Search, 
  Bell, 
  TrendingUp, 
  PlusCircle, 
  CheckCircle2,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import AnalyzeCough from './AnalyzeCough';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Analyze Cough', icon: Microscope },
    { name: 'History', icon: History },
    { name: 'Model Info', icon: Info },
    { name: 'About', icon: HelpCircle },
  ];

  const stats = [
    { label: 'Total Analyses', value: '128', icon: TrendingUp, color: 'var(--primary)' },
    { label: 'Last Result', value: 'Normal', icon: CheckCircle2, color: 'var(--secondary)' },
    { label: 'Accuracy', value: '98.4%', icon: Info, color: 'var(--primary)' },
  ];

  const historyData = [
    { id: 1, date: '2024-03-20', time: '14:30', result: 'Normal', confidence: '99.2%' },
    { id: 2, date: '2024-03-18', time: '09:15', result: 'Persistent Cough', confidence: '87.5%' },
    { id: 3, date: '2024-03-15', time: '18:45', result: 'Normal', confidence: '96.8%' },
    { id: 4, date: '2024-03-10', time: '11:20', result: 'Acute Bronchitis', confidence: '92.1%' },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-transform duration-300 md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`} 
             style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                   style={{ backgroundColor: 'var(--primary)' }}>
                C
              </div>
              <span className="text-xl font-bold tracking-tight">CoughNet</span>
            </div>
            <button className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  activeTab === item.name ? 'font-semibold' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                style={{
                  backgroundColor: activeTab === item.name ? 'var(--primary)' : 'transparent',
                  color: activeTab === item.name ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <item.icon size={20} className={activeTab === item.name ? 'text-white' : 'group-hover:text-primary'} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col w-full">
        {/* Navbar */}
        <header className="h-16 sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 border-b backdrop-blur-md bg-opacity-80"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="relative w-full max-w-sm hidden sm:block ml-2 md:ml-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search data..." 
                     className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 transition-all text-sm"
                     style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', '--tw-ring-color': 'var(--primary)' }} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden xs:block"></div>
            <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative border"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
              <Bell size={18} style={{ color: 'var(--primary)' }} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2" style={{ borderColor: 'var(--card)' }}></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold truncate max-w-[120px]">User Name</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Member</p>
              </div>
              <div className="w-10 h-10 rounded-full ring-2 ring-offset-2 flex items-center justify-center overflow-hidden shrink-0"
                   style={{ backgroundColor: 'var(--primary)', ringColor: 'var(--primary)' }}>
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {activeTab === 'Dashboard' ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Welcome back, User 👋</h1>
                  <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Your health data is safe and being analyzed by our AI models.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('Analyze Cough')}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <PlusCircle size={20} />
                  New Analysis
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-6 rounded-2xl border shadow-sm transition-all hover:shadow-md"
                       style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                      </div>
                      <div className="p-3 rounded-xl scale-110" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Action Card */}
              <div 
                onClick={() => setActiveTab('Analyze Cough')}
                className="relative overflow-hidden rounded-3xl p-8 border group cursor-pointer transition-all hover:border-primary/50"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-4">Analyze New Cough 🫁</h2>
                    <p className="mb-6 max-w-md" style={{ color: 'var(--text-secondary)' }}>
                      Upload a 10-second recording of your cough. Our advanced AI will analyze the acoustic patterns to provide early medical insights.
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab('Analyze Cough');
                      }}
                      className="px-8 py-3 rounded-xl font-bold text-white shadow-xl transition-all hover:px-10"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      Start Analysis
                    </button>
                  </div>
                  <div className="w-full md:w-1/3 aspect-video rounded-2xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 group-hover:scale-105 transition-transform duration-500">
                    <div className="flex gap-1 items-end h-16">
                      {[40, 70, 45, 90, 65, 80, 50, 85, 40].map((h, i) => (
                        <div key={i} className="w-2 rounded-full bg-primary animate-pulse" 
                             style={{ height: `${h}%`, backgroundColor: 'var(--primary)', animationDelay: `${i * 100}ms` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Abstract Background Decor */}
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ backgroundColor: 'var(--primary)' }}></div>
              </div>

              {/* Recent Activity Table */}
              <div className="rounded-3xl border overflow-hidden" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="text-lg font-bold">Recent Analyses</h3>
                  <button className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary)' }}>View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead style={{ backgroundColor: 'var(--bg)' }}>
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Date</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Result</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Confidence</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ divideColor: 'var(--border)' }}>
                      {historyData.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium">{row.date}</p>
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{row.time}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              row.result === 'Normal' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-orange-50 text-orange-700 border-orange-100'
                            }`}>
                              {row.result}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: row.confidence, backgroundColor: 'var(--primary)' }}></div>
                              </div>
                              <span className="text-xs font-bold">{row.confidence}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => navigate('/result', { state: { status: row.result === 'Normal' ? 'Healthy' : 'Infected', confidence: row.confidence.replace('%', '') } })}
                              className="text-sm font-bold transition-opacity hover:opacity-70" 
                              style={{ color: 'var(--primary)' }}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : activeTab === 'Analyze Cough' ? (
            <AnalyzeCough />
          ) : (
            <div className="flex flex-col items-center justify-center p-20 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <LayoutDashboard size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-gray-500 max-w-sm">
                The {activeTab} section is currently under development. Please check back later!
              </p>
              <button 
                onClick={() => setActiveTab('Dashboard')}
                className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
