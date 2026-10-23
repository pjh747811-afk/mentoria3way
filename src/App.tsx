import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SpectrumRoleBar, UserRole } from './components/SpectrumRoleBar';
import { InstitutionDashboard } from './components/dashboards/InstitutionDashboard';
import { MentorDashboard } from './components/dashboards/MentorDashboard';
import { MenteeDashboard } from './components/dashboards/MenteeDashboard';
import { MentorExplore } from './components/MentorExplore';
import { MentoringCalendar } from './components/MentoringCalendar';
import { GrantRecommendations } from './components/GrantRecommendations';
import { MyPage } from './components/MyPage';
import { ApplicationModal } from './components/ApplicationModal';
import { SubServicesHub } from './components/SubServicesHub';
import { MOCK_MENTORS } from './data/mockData';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('mentee');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [selectedMentorName, setSelectedMentorName] = useState('김현직 멘토');

  const handleOpenApplication = (mentorId?: string) => {
    if (mentorId) {
      const mentor = MOCK_MENTORS.find((m) => m.id === mentorId);
      if (mentor) {
        setSelectedMentorName(mentor.name);
      }
    } else {
      setSelectedMentorName('김현직 멘토');
    }
    setIsApplicationOpen(true);
  };

  const handleSelectMentor = (mentorId: string) => {
    handleOpenApplication(mentorId);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-sans antialiased">
      {/* Top Fixed Header with Role Dropdown */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        unreadCount={currentRole === 'institution' ? 2 : currentRole === 'mentor' ? 1 : 2}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-20 pb-24 md:pb-12">
        {/* Spectrum Role Switcher Bar - Prominently displayed for smooth persona transitions */}
        <SpectrumRoleBar
          currentRole={currentRole}
          onRoleChange={(role) => {
            setCurrentRole(role);
            setActiveTab('dashboard');
          }}
        />

        {/* Tab View Routing */}
        {activeTab === 'dashboard' && (
          <>
            {currentRole === 'institution' && <InstitutionDashboard />}
            {currentRole === 'mentor' && <MentorDashboard />}
            {currentRole === 'mentee' && (
              <MenteeDashboard
                onOpenApplication={handleOpenApplication}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}
          </>
        )}

        {activeTab === 'explore' && (
          <MentorExplore onSelectMentor={handleSelectMentor} />
        )}

        {activeTab === 'calendar' && (
          <MentoringCalendar onOpenBooking={() => handleOpenApplication()} />
        )}

        {activeTab === 'grants' && (
          <GrantRecommendations
            onRequestReview={(title) => {
              setSelectedMentorName(`이민영 멘토 (${title} 첨삭)`);
              setIsApplicationOpen(true);
            }}
          />
        )}

        {activeTab === 'mypage' && (
          <MyPage onOpenApplication={() => handleOpenApplication()} />
        )}

        {activeTab === 'services' && (
          <SubServicesHub
            onActivateModule={(role, tabId, actionName) => {
              setCurrentRole(role);
              setActiveTab(tabId);
              if (actionName?.includes('STEP 2/2') || actionName?.includes('신청')) {
                setIsApplicationOpen(true);
              }
            }}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Application Form Modal (Step 2/2) */}
      <ApplicationModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        mentorName={selectedMentorName}
      />
    </div>
  );
}

export default App;
