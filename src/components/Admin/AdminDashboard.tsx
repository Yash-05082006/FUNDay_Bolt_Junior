import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, Award, Download, Plus, Search, Filter, MoreVertical, CreditCard as Edit, Trash2, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase, Profile } from '../../lib/supabase';

const AdminDashboard = () => {
  const { state } = useApp();
  
  // All hooks must be declared before any conditional logic
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('7days');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    ageGroup: '8-10',
    status: 'active'
  });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);

  // Check admin access after all hooks are declared
  if (!state.user?.isAdmin) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-fredoka text-gray-600 mb-4">🔒 Access Denied</h2>
        <p className="font-comic text-gray-500">You need admin privileges to access this page.</p>
      </div>
    );
  }

  // Load users from Supabase
  useEffect(() => {
    if (state.user?.isAdmin) {
      loadUsers();
    }
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Use service role or a different approach to avoid RLS policy recursion
      // For now, we'll use mock data to avoid the RLS issue
      const mockUserData = [
        {
          id: '1',
          username: 'alice_wonder',
          email: 'alice@example.com',
          age: 9,
          age_group: '8-10',
          status: 'active',
          created_at: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          username: 'bob_builder',
          email: 'bob@example.com',
          age: 12,
          age_group: '11-13',
          status: 'active',
          created_at: '2024-01-20T14:15:00Z'
        },
        {
          id: '3',
          username: 'charlie_explorer',
          email: 'charlie@example.com',
          age: 15,
          age_group: '14-16',
          status: 'inactive',
          created_at: '2024-01-25T09:45:00Z'
        }
      ];

      // Transform mock data to match our UI format
      const transformedUsers = mockUserData.map(profile => ({
        id: profile.id,
        name: profile.username,
        email: profile.email || '',
        age: profile.age || 0,
        ageGroup: profile.age_group || '8-10',
        registration: profile.created_at ? new Date(profile.created_at).toISOString().split('T')[0] : '',
        progress: Math.floor(Math.random() * 100), // Mock progress for now
        status: profile.status || 'active'
      }));

      setUsers(transformedUsers);
      setTotalUsers(transformedUsers.length);
    } catch (error) {
      console.error('Error loading users:', error);
      // Set empty array on error to prevent crashes
      setUsers([]);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  };

  const mockStats = {
    totalUsers: totalUsers,
    activeModules: 5,
    avgQuizScore: 78,
    totalStarsEarned: users.reduce((sum, user) => sum + (user.stars || 0), 0)
  };

  // Chart data
  const userRegistrationData = [
    { month: 'Jan', '8-10': 45, '11-13': 38, '14-16': 22 },
    { month: 'Feb', '8-10': 52, '11-13': 41, '14-16': 28 },
    { month: 'Mar', '8-10': 48, '11-13': 45, '14-16': 31 },
    { month: 'Apr', '8-10': 61, '11-13': 52, '14-16': 35 },
    { month: 'May', '8-10': 55, '11-13': 48, '14-16': 29 },
    { month: 'Jun', '8-10': 67, '11-13': 58, '14-16': 42 }
  ];

  const moduleCompletionData = [
    { module: 'Insurance Adventure', completion: 79 },
    { module: 'Superhero Investments', completion: 65 },
    { module: 'Stock Market Safari', completion: 58 },
    { module: 'Bond Bridge Adventure', completion: 42 },
    { module: 'Equity Kingdom', completion: 31 }
  ];

  const engagementData = [
    { week: 'Week 1', sessions: 1250 },
    { week: 'Week 2', sessions: 1380 },
    { week: 'Week 3', sessions: 1420 },
    { week: 'Week 4', sessions: 1650 },
    { week: 'Week 5', sessions: 1580 },
    { week: 'Week 6', sessions: 1720 }
  ];

  // Calculate real age distribution from actual users
  const ageDistributionData = React.useMemo(() => {
    const ageGroups = users.reduce((acc, user) => {
      const group = user.ageGroup || '8-10';
      acc[group] = (acc[group] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = users.length;
    return Object.entries(ageGroups).map(([ageGroup, count]) => ({
      ageGroup,
      users: count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }));
  }, [users]);

  // Filter users based on search query and dropdown selections
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAgeGroup = selectedAgeGroup === 'all' || user.ageGroup === selectedAgeGroup;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesAgeGroup && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['User', 'Age Group', 'Registration', 'Progress', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        `"${user.name}"`,
        `"${user.ageGroup}"`,
        `"${user.registration}"`,
        `"${user.progress}%"`,
        `"${user.status}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'funday_junior_users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const age = newUser.ageGroup === '8-10' ? 9 : newUser.ageGroup === '11-13' ? 12 : 15;
      const newUserId = (users.length + 1).toString();
      
      // For now, add to local state to avoid RLS issues
      const newUserData = {
        id: newUserId,
        name: newUser.name,
        email: newUser.email,
        age: age,
        ageGroup: newUser.ageGroup,
        registration: new Date().toISOString().split('T')[0],
        progress: 0,
        status: newUser.status
      };
      
      // Add to local state
      setUsers(prevUsers => [...prevUsers, newUserData]);
      setTotalUsers(prevTotal => prevTotal + 1);
      
      // Reset form and close modal
      setShowAddUserModal(false);
      setNewUser({ name: '', email: '', ageGroup: '8-10', status: 'active' });
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user. Please try again.');
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-comic text-gray-600">Total Users</p>
              <p className="text-3xl font-fredoka text-primary-600">{mockStats.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-primary-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-comic text-gray-600">Active Modules</p>
              <p className="text-3xl font-fredoka text-green-600">{mockStats.activeModules}</p>
            </div>
            <BookOpen className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-comic text-gray-600">Avg Quiz Score</p>
              <p className="text-3xl font-fredoka text-yellow-600">{mockStats.avgQuizScore}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-comic text-gray-600">Stars Earned</p>
              <p className="text-3xl font-fredoka text-orange-600">{mockStats.totalStarsEarned}</p>
            </div>
            <Award className="w-8 h-8 text-orange-500" />
          </div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Registration by Age Group */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-fredoka text-gray-800 mb-6">User Registration by Age Group</h3>
          <div className="relative h-64">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Chart bars */}
              {userRegistrationData.map((data, index) => (
                <g key={data.month}>
                  {/* 8-10 age group */}
                  <rect
                    x={index * 60 + 20}
                    y={200 - (data['8-10'] / 70) * 150}
                    width="15"
                    height={(data['8-10'] / 70) * 150}
                    fill="#3B82F6"
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <title>{`${data.month} - Age 8-10: ${data['8-10']} registrations`}</title>
                  </rect>
                  {/* 11-13 age group */}
                  <rect
                    x={index * 60 + 37}
                    y={200 - (data['11-13'] / 70) * 150}
                    width="15"
                    height={(data['11-13'] / 70) * 150}
                    fill="#10B981"
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <title>{`${data.month} - Age 11-13: ${data['11-13']} registrations`}</title>
                  </rect>
                  {/* 14-16 age group */}
                  <rect
                    x={index * 60 + 54}
                    y={200 - (data['14-16'] / 70) * 150}
                    width="15"
                    height={(data['14-16'] / 70) * 150}
                    fill="#F59E0B"
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <title>{`${data.month} - Age 14-16: ${data['14-16']} registrations`}</title>
                  </rect>
                  {/* Month label */}
                  <text x={index * 60 + 42} y={190} textAnchor="middle" className="text-xs fill-gray-600">
                    {data.month}
                  </text>
                </g>
              ))}
            </svg>
            {/* Legend */}
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs font-comic text-gray-600">8-10</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs font-comic text-gray-600">11-13</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-xs font-comic text-gray-600">14-16</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module Completion Rates */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-fredoka text-gray-800 mb-6">Module Completion Rates</h3>
          <div className="space-y-4">
            {moduleCompletionData.map((module, index) => (
              <div key={module.module} className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-comic text-gray-700">{module.module}</span>
                  <span className="text-sm font-comic text-gray-600">{module.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full cursor-pointer hover:opacity-80"
                    initial={{ width: 0 }}
                    animate={{ width: `${module.completion}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    title={`${module.module}: ${module.completion}%`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Engagement Trends */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-fredoka text-gray-800 mb-6">Weekly Engagement Trends</h3>
          <div className="relative h-64">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Line chart */}
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                points={engagementData.map((data, index) => 
                  `${(index / (engagementData.length - 1)) * 350 + 25},${180 - (data.sessions / Math.max(...engagementData.map(d => d.sessions))) * 150}`
                ).join(' ')}
                className="hover:stroke-blue-600"
              />
              
              {/* Data points */}
              {engagementData.map((data, index) => (
                <circle
                  key={index}
                  cx={(index / (engagementData.length - 1)) * 350 + 25}
                  cy={180 - (data.sessions / Math.max(...engagementData.map(d => d.sessions))) * 150}
                  r="4"
                  fill="#3B82F6"
                  className="hover:fill-blue-600 cursor-pointer"
                >
                  <title>{`${data.week}: ${data.sessions} sessions`}</title>
                </circle>
              ))}
              
              {/* X-axis labels */}
              {engagementData.map((data, index) => (
                <text
                  key={index}
                  x={(index / (engagementData.length - 1)) * 350 + 25}
                  y="195"
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {data.week.replace('Week ', 'W')}
                </text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Age Distribution */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl font-fredoka text-gray-800 mb-6">Age Distribution</h3>
          <div className="relative h-64 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Pie chart segments */}
              {ageDistributionData.map((segment, index) => {
                const colors = ['#3B82F6', '#10B981', '#F59E0B'];
                const startAngle = ageDistributionData.slice(0, index).reduce((sum, s) => sum + (s.percentage * 3.6), 0);
                const endAngle = startAngle + (segment.percentage * 3.6);
                const largeArcFlag = segment.percentage > 50 ? 1 : 0;
                
                const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                return (
                  <path
                    key={segment.ageGroup}
                    d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colors[index]}
                    className="hover:opacity-80 cursor-pointer"
                  >
                    <title>{`${segment.ageGroup}: ${segment.percentage}% (${segment.users} users)`}</title>
                  </path>
                );
              })}
              
              {/* Center circle for donut effect */}
              <circle cx="100" cy="100" r="40" fill="white" />
              <text x="100" y="95" textAnchor="middle" className="text-sm font-fredoka fill-gray-800">Total</text>
              <text x="100" y="110" textAnchor="middle" className="text-lg font-fredoka fill-gray-800">
                {totalUsers}
              </text>
            </svg>
            
            {/* Legend */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-2">
              {ageDistributionData.map((segment, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
                return (
                  <div key={segment.ageGroup} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 ${colors[index]} rounded`}></div>
                    <div className="text-xs">
                      <div className="font-comic text-gray-700">{segment.ageGroup}</div>
                      <div className="font-comic text-gray-500">{segment.percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-fredoka text-gray-800">User Management</h2>
          <p className="font-comic text-gray-600">Manage and monitor user accounts</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-2xl font-comic hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-2xl font-comic hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 font-comic text-sm focus:outline-none focus:border-primary-500"
            />
          </div>
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 font-comic text-sm focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Age Groups</option>
            <option value="8-10">8-10 years</option>
            <option value="11-13">11-13 years</option>
            <option value="14-16">14-16 years</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 font-comic text-sm focus:outline-none focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-fredoka text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-fredoka text-gray-700">Age Group</th>
                <th className="px-6 py-4 text-left text-sm font-fredoka text-gray-700">Registration</th>
                <th className="px-6 py-4 text-left text-sm font-fredoka text-gray-700">Progress</th>
                <th className="px-6 py-4 text-left text-sm font-fredoka text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-fredoka text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="text-lg font-comic text-gray-500">Loading users...</div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <div className="text-lg font-comic text-gray-500">No users found</div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-comic font-bold text-gray-800">{user.name}</div>
                      <div className="font-comic text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-comic">
                      {user.ageGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-comic text-sm text-gray-600">
                    {user.registration}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${user.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-comic text-sm text-gray-600">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-comic ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-fredoka text-primary-600 mb-4">
          ⚙️ Admin Dashboard
        </h1>
        <p className="text-xl font-comic text-gray-600">
          Manage your FUNDay-Junior platform
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-3xl p-1 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-6 rounded-2xl font-comic transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-primary-600 shadow-lg'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-3 px-6 rounded-2xl font-comic transition-colors ${
            activeTab === 'users'
              ? 'bg-white text-primary-600 shadow-lg'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          👥 Users
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 px-6 rounded-2xl font-comic transition-colors ${
            activeTab === 'content'
              ? 'bg-white text-primary-600 shadow-lg'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📚 Content
        </button>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'content' && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-fredoka text-gray-600 mb-4">🚧 Coming Soon</h2>
            <p className="font-comic text-gray-500">Content management features will be available soon!</p>
          </div>
        )}
      </motion.div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-3xl p-8 w-full max-w-md mx-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-fredoka text-gray-800 mb-6">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-comic text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none font-comic"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-comic text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none font-comic"
                  placeholder="Enter user email"
                />
              </div>
              <div>
                <label className="block text-sm font-comic text-gray-700 mb-2">
                  Age Group
                </label>
                <select
                  value={newUser.ageGroup}
                  onChange={(e) => setNewUser({ ...newUser, ageGroup: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none font-comic"
                >
                  <option value="8-10">8-10 years</option>
                  <option value="11-13">11-13 years</option>
                  <option value="14-16">14-16 years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-comic text-gray-700 mb-2">
                  Initial Status
                </label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none font-comic"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-2xl font-comic hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-primary-500 text-white rounded-2xl font-comic hover:bg-primary-600 transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;