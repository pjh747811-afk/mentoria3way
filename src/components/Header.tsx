import React, { useState } from 'react';
import { UserRole } from './SpectrumRoleBar';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  setCurrentRole,
  unreadCount = 2,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: '홈 대시보드', icon: 'dashboard' },
    { id: 'explore', label: '멘토 탐색·매칭', icon: 'manage_search' },
    { id: 'calendar', label: '멘토링 캘린더', icon: 'event_available' },
    { id: 'grants', label: '지원사업 추천', icon: 'policy' },
    { id: 'mypage', label: '프로필 관리', icon: 'person_outline' },
  ];

  const roleConfigs = {
    institution: {
      name: '기관 / 거버넌스',
      badge: '중기부·창진원',
      color: 'bg-indigo-600 text-white',
      border: 'border-indigo-400',
      icon: 'account_balance',
    },
    mentor: {
      name: '전문가 / 멘토',
      badge: '김현직 멘토',
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-400',
      icon: 'workspace_premium',
    },
    mentee: {
      name: '멘티 / 창업자',
      badge: '김멘티',
      color: 'bg-[#004ac6] text-white',
      border: 'border-blue-400',
      icon: 'rocket_launch',
    },
  };

  const currentRoleConfig = roleConfigs[currentRole];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#f7f9fb]/90 backdrop-blur-xl border-b border-[#e0e3e5]/70 shadow-xs">
        <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
          {/* Logo & Menu Drawer Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-[#191c1e] hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <div
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-1.5 cursor-pointer select-none"
            >
              <span className="font-extrabold text-[20px] text-[#004ac6] tracking-tight">멘토리아</span>
              <span className="text-[10px] text-[#4f5e81] tracking-widest uppercase font-bold px-1.5 py-0.5 rounded bg-blue-100/70">
                Mentoria
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#004ac6] text-white shadow-xs'
                      : 'text-[#434655] hover:bg-slate-200/50 hover:text-[#004ac6]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Role Quick Switcher & User Avatar */}
          <div className="flex items-center gap-2 relative">
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${currentRoleConfig.color}`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {currentRoleConfig.icon}
                </span>
                <span className="hidden sm:inline">{currentRoleConfig.name}</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {/* Role Dropdown */}
              {isRoleMenuOpen && (
                <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <span className="text-[10px] font-bold text-slate-400 px-2 py-1 block uppercase">
                    3대 핵심 서브대시보드 전환
                  </span>
                  {(['institution', 'mentor', 'mentee'] as UserRole[]).map((r) => {
                    const cfg = roleConfigs[r];
                    const isCur = currentRole === r;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          setCurrentRole(r);
                          setIsRoleMenuOpen(false);
                          setActiveTab('dashboard');
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                          isCur ? 'bg-slate-100 text-slate-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px]">
                            {cfg.icon}
                          </span>
                          <span>{cfg.name}</span>
                        </div>
                        {isCur && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notification Button */}
            <button
              onClick={() => {
                setShowNotificationToast(true);
                setTimeout(() => setShowNotificationToast(false), 3000);
              }}
              aria-label="알림"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#434655] hover:bg-slate-200/60 transition-colors relative cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Dropdown Navigation Menu Drawer */}
        {isMenuOpen && (
          <div className="border-t border-[#e0e3e5] bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="max-w-5xl mx-auto p-4">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#004ac6] animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-800">플랫폼 바로가기 메뉴</span>
                </div>
                <span className="text-[11px] text-slate-400">통합 서브대시보드</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-blue-50/80 border border-[#004ac6]/30 text-[#004ac6]'
                          : 'bg-[#f7f9fb] hover:bg-slate-100 text-[#191c1e]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`material-symbols-outlined text-[20px] ${
                            isActive ? 'text-[#004ac6]' : 'text-[#4f5e81]'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="text-sm font-semibold">{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#004ac6] text-white">
                          현재
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Notification Toast */}
      {showNotificationToast && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined text-amber-400 text-[18px]">info</span>
          <span>
            {currentRole === 'institution'
              ? '전문가 멘토링비 정산 승인 요청 2건이 대기 중입니다.'
              : currentRole === 'mentor'
              ? '김멘티 님의 1:1 멘토링 신청 질문지가 도착했습니다.'
              : '오늘 오후 7시 김현직 멘토와의 화상 세션 링크가 준비되었습니다.'}
          </span>
        </div>
      )}
    </>
  );
};
