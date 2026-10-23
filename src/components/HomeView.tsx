import React, { useState, useEffect } from 'react';
import { Mentor, Grant, MentoringSession, TabType } from '../types';

interface HomeViewProps {
  sessions: MentoringSession[];
  grants: Grant[];
  mentors: Mentor[];
  onNavigate: (tab: TabType) => void;
  onJoinSession: (session: MentoringSession) => void;
  onOpenReview: (session: MentoringSession) => void;
  onSelectMentor: (mentor: Mentor) => void;
  onShowToast: (msg: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  sessions,
  grants,
  mentors,
  onNavigate,
  onJoinSession,
  onOpenReview,
  onSelectMentor,
  onShowToast,
}) => {
  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState('02:45:10');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(19, 0, 0, 0);
      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const hrs = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const secs = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        setTimeLeft(`${hrs}:${mins}:${secs}`);
      } else {
        setTimeLeft('라이브 진행 중');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const upcomingSession = sessions.find((s) => s.status === 'waiting') || sessions[0];

  return (
    <div className="space-y-4 pb-6">
      {/* (1) Upper Greeting Line */}
      <section className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-primary-fixed/40 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container">
            <span className="material-symbols-outlined text-[16px]">waving_hand</span>
          </span>
          <span className="text-xs uppercase tracking-wider text-secondary font-bold">Mentoria Member</span>
          <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
            라이브 매칭 활성
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl text-on-surface font-bold leading-tight">
          안녕하세요, 김멘티님! 오늘의 멘토링과 추천 지원사업을 확인하세요.
        </h2>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          신뢰할 수 있는 현직자 멘토링과 맞춤형 정책 자금이 성공적인 성장을 지원합니다.
        </p>
      </section>

      {/* (2) Top 3 Stat Cards in a clean responsive row */}
      <section className="grid grid-cols-3 gap-2 sm:gap-3">
        {/* Card 1: 진행 예정 */}
        <div
          onClick={() => onNavigate('my-mentoring')}
          className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container p-3 sm:p-4 flex flex-col justify-between cursor-pointer hover:border-primary/40 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs text-on-surface-variant font-medium truncate">진행 예정</span>
              <span className="w-6 h-6 rounded-md bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              </span>
            </div>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-2xl sm:text-3xl text-primary font-extrabold tracking-tight leading-none">
                {sessions.filter((s) => s.status === 'waiting' || s.status === 'upcoming').length}
              </span>
              <span className="text-xs text-primary font-bold">건</span>
            </div>
          </div>
          <div className="mt-2.5 pt-1.5 border-t border-surface-container flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-[11px] text-on-surface-variant truncate font-medium">10.12 확정</span>
          </div>
        </div>

        {/* Card 2: 추천 지원사업 */}
        <div
          onClick={() => onNavigate('grants')}
          className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container p-3 sm:p-4 flex flex-col justify-between cursor-pointer hover:border-tertiary/40 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs text-on-surface-variant font-medium truncate">추천 지원사업</span>
              <span className="w-6 h-6 rounded-md bg-tertiary-fixed/60 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[16px]">assured_workload</span>
              </span>
            </div>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-2xl sm:text-3xl text-tertiary font-extrabold tracking-tight leading-none">
                {grants.length}
              </span>
              <span className="text-xs text-tertiary font-bold">건</span>
            </div>
          </div>
          <div className="mt-2.5 pt-1.5 border-t border-surface-container flex items-center gap-1">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] px-1.5 py-0.5 rounded leading-none truncate">
              최고 매칭 98%
            </span>
          </div>
        </div>

        {/* Card 3: 프로필 완성도 */}
        <div
          onClick={() => onNavigate('profile')}
          className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container p-3 sm:p-4 flex flex-col justify-between cursor-pointer hover:border-secondary/40 transition-all hover:shadow-md"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] sm:text-xs text-on-surface-variant font-medium truncate">프로필 완성도</span>
              <span className="w-6 h-6 rounded-md bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[16px]">badge</span>
              </span>
            </div>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-2xl sm:text-3xl text-on-primary-fixed font-extrabold tracking-tight leading-none">85</span>
              <span className="text-xs text-on-primary-fixed font-bold">%</span>
            </div>
          </div>
          <div className="mt-2.5 pt-1.5 border-t border-surface-container flex flex-col justify-center gap-1">
            <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* (3) D-DAY Live Highlight Session Card */}
      {upcomingSession && (
        <section className="bg-gradient-to-br from-primary-fixed/50 via-surface-container-lowest to-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-primary/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error text-on-error text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                D-DAY 오늘 세션
              </span>
              <span className="text-xs text-primary font-semibold bg-primary-fixed px-2 py-0.5 rounded-full">
                온라인 1:1 라이브
              </span>
            </div>
            <button
              onClick={() => onShowToast('캘린더 일정 및 사전 알림이 등록되었습니다.')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary text-xs font-semibold border border-primary/20 shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">timer</span>
              <span>입장까지 {timeLeft}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30 shrink-0 shadow-sm">
                <img
                  src={upcomingSession.mentorAvatar}
                  alt={upcomingSession.mentorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-on-surface">{upcomingSession.mentorName} 멘토</h3>
                  <span className="text-xs text-primary font-semibold bg-primary-fixed/40 px-2 py-0.5 rounded">
                    {upcomingSession.categoryLabel}
                  </span>
                </div>
                <p className="text-sm font-medium text-on-surface truncate mt-0.5">
                  {upcomingSession.topic}
                </p>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1">
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                    {upcomingSession.dateStr} {upcomingSession.timeStr}
                  </span>
                  <span>·</span>
                  <span className="text-primary font-medium">시작 15분 전 입장 대기 오픈</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <button
                onClick={() => onJoinSession(upcomingSession)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-bold shadow-md hover:bg-primary-container transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">videocam</span>
                <span>세션 룸 입장하기</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* (4) Recent Mentoring Matches */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <h3 className="text-base font-bold text-on-surface tracking-tight">최근 멘토링 매칭 및 예약</h3>
          </div>
          <button
            onClick={() => onNavigate('my-mentoring')}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>전체보기</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        <div className="space-y-3">
          {sessions.slice(0, 4).map((session) => (
            <div
              key={session.id}
              className="border border-surface-container rounded-xl p-3.5 sm:p-4 hover:border-primary/40 transition-all bg-surface-container-lowest shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={session.mentorAvatar}
                    alt={session.mentorName}
                    className="w-10 h-10 rounded-full object-cover border border-surface-container shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-bold text-on-surface">{session.mentorName}</span>
                      <span className="text-[11px] text-primary bg-primary-fixed/40 px-2 py-0.2 rounded font-medium">
                        {session.categoryLabel}
                      </span>
                      <span className="text-xs text-secondary truncate">{session.mentorRole}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-on-surface mt-1 truncate">
                      {session.topic}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {session.status === 'waiting' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary text-xs font-bold border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      확정됨
                    </span>
                  )}
                  {session.status === 'completed' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold border border-tertiary/20">
                      <span className="material-symbols-outlined text-[12px] text-tertiary">check_circle</span>
                      완료됨
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-surface-container text-xs text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-outline">event_available</span>
                  일시: {session.dateStr}
                </span>

                <div className="flex items-center gap-1.5">
                  {session.status === 'waiting' && (
                    <button
                      onClick={() => onJoinSession(session)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">videocam</span>
                      입장하기
                    </button>
                  )}
                  {session.status === 'completed' && session.canReview && (
                    <button
                      onClick={() => onOpenReview(session)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">rate_review</span>
                      리뷰 작성 (+3,000P)
                    </button>
                  )}
                  {session.status === 'completed' && !session.canReview && (
                    <span className="text-outline bg-surface-container-low px-2 py-0.5 rounded border border-surface-container text-[11px]">
                      {session.reviewed ? '리뷰 작성완료' : '세션 종료'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* (5) Top Recommended Grants Strip */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
            <h3 className="text-base font-bold text-on-surface tracking-tight">AI 맞춤 추천 정부지원사업</h3>
          </div>
          <button
            onClick={() => onNavigate('grants')}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-0.5"
          >
            <span>전체 {grants.length}건</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {grants.slice(0, 2).map((grant) => (
            <div
              key={grant.id}
              onClick={() => onNavigate('grants')}
              className="border border-surface-container rounded-xl p-3.5 hover:border-tertiary/40 transition-all cursor-pointer bg-surface-container-low/50 hover:bg-surface-container-low"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="text-[11px] font-bold text-tertiary bg-tertiary-fixed px-2 py-0.2 rounded-full">
                  매칭 {grant.matchScore}%
                </span>
                <span className="text-[11px] font-bold text-error bg-error-container/40 px-2 py-0.2 rounded-full">
                  D-{grant.dDay} 마감
                </span>
              </div>
              <h4 className="text-sm font-bold text-on-surface line-clamp-1">{grant.title}</h4>
              <p className="text-xs text-on-surface-variant line-clamp-1 mt-1">{grant.description}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-container text-xs">
                <span className="text-secondary">{grant.agency}</span>
                <span className="text-primary font-extrabold">{grant.maxFundingText}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* (6) Quick Action Floating Banner */}
      <div className="p-4 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">person_search</span>
          </span>
          <div>
            <h4 className="text-sm font-bold">궁금한 분야의 현직 멘토를 바로 찾아보세요</h4>
            <p className="text-xs text-secondary mt-0.5">네카라쿠배·빅테크 현직자 1:1 라이브 상담 지원</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('mentors')}
          className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors shrink-0"
        >
          멘토 찾기
        </button>
      </div>
    </div>
  );
};
