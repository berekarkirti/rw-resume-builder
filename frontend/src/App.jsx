import React from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Header } from './components/Header';
import { Workspace } from './components/Workspace';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const AppContent = () => {
  const { activeTab, toastMessage } = useResume();

  return (
    <div className="h-dvh min-h-screen flex flex-col bg-rnw-gray-50 text-rnw-charcoal">
      {/* Top Header */}
      <Header />

      {/* Main Content View (Student Builder vs Placement Admin) */}
      <main className="flex-1 flex flex-col min-h-0">
        {activeTab === 'workspace' ? <Workspace /> : <AdminDashboard />}
      </main>

      {/* Global Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce-short">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold border ${
              toastMessage.type === 'error'
                ? 'bg-red-900 text-white border-red-700'
                : toastMessage.type === 'info'
                ? 'bg-gray-900 text-white border-gray-700'
                : 'bg-emerald-900 text-white border-emerald-700'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
            ) : toastMessage.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-300 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            )}
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}
