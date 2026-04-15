import React from 'react';
import { useUnityHub } from '../../core/UnityHubContext';

const EducationHub: React.FC = () => {
  const { state } = useUnityHub();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-teal-800 mb-6">
        🎓 Education Hub
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Welcome Section */}
        <div className="bg-teal-50 rounded-lg p-4">
          <h3 className="font-semibold text-teal-700 mb-2">Welcome to Education Hub</h3>
          <p className="text-gray-600 text-sm">
            Empower your learning journey with AI-augmented life science education.
            Access 500+ courses across all levels with personalized learning paths.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-700 mb-2">Your Learning Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Courses Enrolled:</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Courses Completed:</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Learning Hours:</span>
              <span className="font-medium">45h 30m</span>
            </div>
          </div>
        </div>

        {/* Global Impact */}
        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-700 mb-2">Global Impact</h3>
          <div className="text-3xl font-bold text-green-800">
            {state.metrics.studentsTrained.toLocaleString()}+
          </div>
          <p className="text-sm text-gray-600 mt-1">Students trained worldwide</p>
        </div>

        {/* Course Categories */}
        <div className="md:col-span-2 lg:col-span-3">
          <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg p-4">
            <h3 className="font-semibold text-teal-800 mb-4">Explore Course Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Genetics', 'Immunology', 'Biochemistry', 'Neuroscience', 'Pharmacology', 'Bioinformatics'].map((category) => (
                <div key={category} className="bg-white rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm font-medium text-teal-600">{category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Featured Courses</h3>
            <div className="space-y-3">
              {['Molecular Biology Fundamentals', 'Advanced Immunology', 'Bioinformatics for Beginners'].map((course, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <span className="text-teal-600 font-medium text-sm">MB</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{course}</div>
                      <div className="text-xs text-gray-500">Intermediate • 40 hours</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-teal-50 text-teal-600 text-xs rounded-full hover:bg-teal-100">
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Resources */}
        <div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-3">Learning Resources</h3>
            <div className="space-y-2">
              {['Interactive Labs', 'Research Papers', 'Video Lectures', 'Quizzes & Assessments'].map((resource) => (
                <div key={resource} className="flex items-center space-x-2">
                  <span className="text-yellow-600">•</span>
                  <span className="text-sm text-gray-700">{resource}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Companion Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-purple-800">Meet Your AI Learning Companion</h3>
            <p className="text-purple-600 mt-1">
              Get 24/7 personalized support from our AI mentors
            </p>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Start Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;