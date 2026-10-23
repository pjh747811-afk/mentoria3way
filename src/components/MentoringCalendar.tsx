import React, { useState } from 'react';
import { MOCK_SESSIONS } from '../data/mockData';

interface MentoringCalendarProps {
  onOpenBooking: () => void;
}

export const MentoringCalendar: React.FC<MentoringCalendarProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredSessions = MOCK_SESSIONS.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.status === activeFilter;
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Calendar Header Card */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#191c1e]">멘토링 일정 캘린더</h2>
            <p className="text-xs text-[#434655]">확정된 멘토링 세션 관리 및 실시간 화상 미팅 입장</p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            새 멘토링 예약
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeFilter === 'all'
                ? 'bg-[#004ac6] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 일정 ({MOCK_SESSIONS.length})
          </button>
          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeFilter === 'upcoming'
                ? 'bg-[#004ac6] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            진행 예정 ({MOCK_SESSIONS.filter((s) => s.status === 'upcoming').length})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              activeFilter === 'completed'
                ? 'bg-[#004ac6] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            완료 세션 ({MOCK_SESSIONS.filter((s) => s.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className={`bg-white rounded-2xl p-5 shadow-xs border transition-all ${
              session.status === 'upcoming'
                ? 'border-blue-300 ring-1 ring-blue-100'
                : 'border-slate-200/80 opacity-90'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    session.status === 'upcoming'
                      ? 'bg-blue-50 text-[#004ac6] border border-blue-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {session.status === 'upcoming' ? '진행 예정' : '완료됨'}
                </span>
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#004ac6]">schedule</span>
                  {session.dateTime} ({session.duration})
                </span>
              </div>
              <span className="text-xs text-slate-400">1:1 온라인 화상 멘토링</span>
            </div>

            <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
              <img
                src={session.mentorAvatar}
                alt={session.mentorName}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#191c1e]">{session.mentorName}</h4>
                  <span className="text-[11px] text-[#4f5e81] font-medium">
                    {session.mentorCompany} · {session.mentorRole}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  질문 주제: {session.topic}
                </p>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500">
                세션 10분 전 사전 알림 및 미팅 링크가 전송되었습니다.
              </span>
              <div className="flex items-center gap-2">
                {session.meetingLink && (
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] flex items-center gap-1 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                    화상 미팅룸 입장
                  </a>
                )}
                {session.status === 'completed' && (
                  <button className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold">
                    멘토 피드백 노트 보기
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
