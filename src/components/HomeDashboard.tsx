import React from 'react';
import { MOCK_MENTORS, MOCK_GRANTS, MOCK_SESSIONS } from '../data/mockData';

interface HomeDashboardProps {
  onOpenApplication: (mentorId?: string) => void;
  setActiveTab: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onOpenApplication,
  setActiveTab,
}) => {
  const upcomingSession = MOCK_SESSIONS.find((s) => s.status === 'upcoming');

  return (
    <div className="space-y-5 pb-6">
      {/* 1. Upper Greeting Line & Daily Briefing */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/80 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-blue-100/60 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-[#004ac6]">
              <span className="material-symbols-outlined text-[18px]">waving_hand</span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4f5e81]">
              Mentoria Member
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-semibold border border-teal-200/50">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            라이브 매칭 활성화
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#191c1e] leading-snug">
          안녕하세요, <span className="text-[#004ac6]">김멘티</span>님! <br className="hidden sm:inline" />
          오늘의 멘토링과 추천 지원사업을 확인하세요.
        </h2>
        <p className="text-sm text-[#434655] mt-2">
          신뢰할 수 있는 현직자 1:1 맞춤 코칭과 적기 지원사업 자금이 성장을 지원합니다.
        </p>

        {/* Quick action buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('explore')}
            className="px-3.5 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-semibold hover:bg-[#003ea8] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            새로운 멘토 찾기
          </button>
          <button
            onClick={() => setActiveTab('grants')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            D-3 청창사 공고 보기
          </button>
        </div>
      </section>

      {/* 2. Top 3 Stat Cards */}
      <section className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Card 1 */}
        <div
          onClick={() => setActiveTab('calendar')}
          className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-xs border border-slate-200/80 cursor-pointer hover:border-blue-400 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs text-[#434655] font-semibold truncate">진행 예정</span>
              <span className="w-6 h-6 rounded-md bg-blue-50 text-[#004ac6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[15px]">calendar_month</span>
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl text-[#004ac6] font-extrabold tracking-tight">3</span>
              <span className="text-xs font-bold text-[#004ac6]">건</span>
            </div>
          </div>
          <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span>
            <span className="text-[10px] sm:text-[11px] text-[#434655] truncate font-medium">오늘 19:00 예정</span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => setActiveTab('mypage')}
          className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-xs border border-slate-200/80 cursor-pointer hover:border-teal-400 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs text-[#434655] font-semibold truncate">완료 세션</span>
              <span className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[15px]">verified</span>
              </span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl sm:text-3xl text-teal-700 font-extrabold tracking-tight">5</span>
              <span className="text-xs font-bold text-teal-700">회</span>
            </div>
          </div>
          <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
            <span className="text-[10px] sm:text-[11px] text-[#434655] truncate font-medium">후기 작성 완료</span>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => setActiveTab('mypage')}
          className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 shadow-xs border border-slate-200/80 cursor-pointer hover:border-amber-400 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs text-[#434655] font-semibold truncate">바우처 포인트</span>
              <span className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[15px]">payments</span>
              </span>
            </div>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-xl sm:text-2xl text-amber-600 font-extrabold tracking-tight">12.5k</span>
              <span className="text-xs font-bold text-amber-600">P</span>
            </div>
          </div>
          <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] sm:text-[11px] text-[#434655] truncate font-medium">정부바우처 연계</span>
          </div>
        </div>
      </section>

      {/* 3. Today's Upcoming Live Session Card */}
      {upcomingSession && (
        <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              오늘 시작되는 1:1 세션
            </span>
            <span className="text-xs font-medium text-blue-200">{upcomingSession.dateTime}</span>
          </div>

          <div className="flex items-center gap-3.5 mb-4">
            <img
              src={upcomingSession.mentorAvatar}
              alt={upcomingSession.mentorName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/30 shadow-md"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{upcomingSession.mentorName}</h3>
                <span className="text-[11px] text-blue-200 bg-white/10 px-2 py-0.5 rounded">
                  {upcomingSession.mentorCompany}
                </span>
              </div>
              <p className="text-xs text-blue-100 truncate mt-0.5">{upcomingSession.topic}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <a
              href={upcomingSession.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-4 rounded-xl bg-white text-[#004ac6] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-50 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">videocam</span>
              Google Meet 화상룸 입장
            </a>
            <button
              onClick={() => onOpenApplication(upcomingSession.id)}
              className="py-2.5 px-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
              질문지 확인
            </button>
          </div>
        </section>
      )}

      {/* 4. Recommended Mentors Section */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-[#191c1e]">오늘의 추천 현직자 멘토</h3>
            <p className="text-xs text-[#434655]">김멘티님의 관심 직무(백엔드/창업) 기반 AI 매칭 결과</p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="text-xs font-bold text-[#004ac6] hover:underline flex items-center"
          >
            전체보기
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_MENTORS.slice(0, 2).map((mentor) => (
            <div
              key={mentor.id}
              className="border border-slate-200/80 rounded-xl p-4 hover:border-[#004ac6]/50 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#191c1e]">{mentor.name}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#004ac6]">
                          {mentor.experienceYears}년차
                        </span>
                      </div>
                      <span className="text-xs text-[#434655]">{mentor.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    {mentor.rating}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-2.5 leading-relaxed">
                  {mentor.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-teal-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  {mentor.availableNext} 예약 가능
                </span>
                <button
                  onClick={() => onOpenApplication(mentor.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#004ac6] text-white text-xs font-semibold hover:bg-[#003ea8] transition-colors"
                >
                  멘토링 신청
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Support Grants Matching Banner */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-base text-[#191c1e]">맞춤형 정부 지원사업 & R&D</h3>
            <p className="text-xs text-[#434655]">마감이 임박한 청년 창업 및 기술 바우처 공고</p>
          </div>
          <button
            onClick={() => setActiveTab('grants')}
            className="text-xs font-bold text-[#004ac6] hover:underline flex items-center"
          >
            모아보기
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {MOCK_GRANTS.slice(0, 2).map((grant) => (
            <div
              key={grant.id}
              onClick={() => setActiveTab('grants')}
              className="p-3.5 rounded-xl border border-slate-100 bg-[#f7f9fb] hover:bg-slate-100/80 transition-colors cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                    D-{grant.dDay}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">{grant.organization}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">{grant.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">{grant.budget} · {grant.target}</p>
              </div>
              <span className="material-symbols-outlined text-slate-400 shrink-0 text-[20px]">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
