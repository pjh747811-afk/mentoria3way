import React, { useState, useMemo } from 'react';
import { MentoringSession } from '../types';

interface MyMentoringViewProps {
  sessions: MentoringSession[];
  onJoinSession: (session: MentoringSession) => void;
  onOpenReview: (session: MentoringSession) => void;
  onShowToast: (msg: string) => void;
}

export const MyMentoringView: React.FC<MyMentoringViewProps> = ({
  sessions,
  onJoinSession,
  onOpenReview,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'waiting' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSessionQuestions, setSelectedSessionQuestions] = useState<MentoringSession | null>(null);

  const waitingCount = sessions.filter((s) => s.status === 'waiting' || s.status === 'upcoming').length;
  const reviewPendingCount = sessions.filter((s) => s.status === 'completed' && s.canReview).length;
  const completedCount = sessions.filter((s) => s.status === 'completed').length;

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (activeTab === 'waiting' && s.status !== 'waiting' && s.status !== 'upcoming') return false;
      if (activeTab === 'completed' && s.status !== 'completed') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = s.mentorName.toLowerCase().includes(q);
        const matchTopic = s.topic.toLowerCase().includes(q);
        const matchCat = s.categoryLabel.toLowerCase().includes(q);
        if (!matchName && !matchTopic && !matchCat) return false;
      }
      return true;
    });
  }, [sessions, activeTab, searchQuery]);

  return (
    <div className="space-y-4 pb-8">
      {/* Top Header */}
      <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-on-surface">멘토링 내역 & 캘린더</h2>
            <span className="text-xs font-bold text-secondary bg-surface-container px-2 py-0.5 rounded-full">
              총 {sessions.length}건
            </span>
          </div>
          {waitingCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-primary font-bold bg-primary-fixed px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {waitingCount}건 진행 대기
            </span>
          )}
        </div>
        <p className="text-xs text-on-surface-variant">
          예약된 라이브 세션 접속 및 완료된 멘토링의 사후 리포트와 리뷰를 관리하세요.
        </p>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-surface-container">
          <div
            onClick={() => setActiveTab('waiting')}
            className={`p-2.5 rounded-lg text-center cursor-pointer transition-all ${
              activeTab === 'waiting'
                ? 'bg-primary-fixed/50 ring-1 ring-primary'
                : 'bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <span className="text-[11px] text-on-surface-variant block">진행 예정</span>
            <span className="text-xl font-bold text-primary">{waitingCount}</span>
            <span className="text-xs text-primary ml-0.5">건</span>
          </div>

          <div
            onClick={() => setActiveTab('completed')}
            className="p-2.5 rounded-lg bg-surface-container-low text-center cursor-pointer hover:bg-surface-container transition-all"
          >
            <span className="text-[11px] text-on-surface-variant block">리뷰 대기</span>
            <span className="text-xl font-bold text-tertiary">{reviewPendingCount}</span>
            <span className="text-xs text-tertiary ml-0.5">건</span>
          </div>

          <div
            onClick={() => setActiveTab('completed')}
            className={`p-2.5 rounded-lg text-center cursor-pointer transition-all ${
              activeTab === 'completed'
                ? 'bg-secondary-fixed/50 ring-1 ring-secondary'
                : 'bg-surface-container-low hover:bg-surface-container'
            }`}
          >
            <span className="text-[11px] text-on-surface-variant block">누적 완료</span>
            <span className="text-xl font-bold text-secondary">{completedCount}</span>
            <span className="text-xs text-secondary ml-0.5">건</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative w-full mt-3">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="멘토명, 분야, 세션 주제 검색"
            className="w-full pl-9 pr-9 py-2 rounded-lg bg-surface-container-low text-xs border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-3 mt-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            전체 ({sessions.length})
          </button>
          <button
            onClick={() => setActiveTab('waiting')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'waiting'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            진행 예정 ({waitingCount})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'completed'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            완료된 세션 ({completedCount})
          </button>
        </div>
      </div>

      {/* Session Cards */}
      <div className="space-y-3">
        {filteredSessions.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center border border-surface-container">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">event_busy</span>
            <h3 className="text-sm font-bold text-on-surface">해당하는 멘토링 내역이 없습니다</h3>
            <p className="text-xs text-on-surface-variant mt-1">새로운 멘토링을 신청해 보세요.</p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className={`bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border transition-all ${
                session.status === 'waiting'
                  ? 'border-primary/40 ring-1 ring-primary/20'
                  : 'border-surface-container'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={session.mentorAvatar}
                    alt={session.mentorName}
                    className="w-12 h-12 rounded-full object-cover border border-surface-container shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-base font-bold text-on-surface">{session.mentorName} 멘토</h3>
                      <span className="text-xs text-primary bg-primary-fixed/40 px-2 py-0.2 rounded font-medium">
                        {session.categoryLabel}
                      </span>
                      <span className="text-xs text-secondary truncate">{session.mentorRole}</span>
                    </div>
                    <p className="text-sm font-semibold text-on-surface mt-1 truncate">
                      {session.topic}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {session.status === 'waiting' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      입장 대기
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold">
                      <span className="material-symbols-outlined text-[13px] text-tertiary">check_circle</span>
                      세션 완료
                    </span>
                  )}
                </div>
              </div>

              {/* Schedule time strip */}
              <div className="bg-surface-container-low rounded-lg p-2.5 mt-3 flex items-center justify-between text-xs text-on-surface">
                <div className="flex items-center gap-1.5 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                  <span>{session.dateStr} {session.timeStr}</span>
                </div>
                <div className="flex items-center gap-1 text-secondary">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">videocam</span>
                  <span>Google Meet 온라인</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container text-xs">
                <button
                  onClick={() => setSelectedSessionQuestions(session)}
                  className="text-secondary hover:text-primary font-semibold flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  사전 질문지 보기
                </button>

                <div className="flex items-center gap-2">
                  {session.status === 'waiting' && (
                    <>
                      <button
                        onClick={() => onShowToast('Google 캘린더에 일정이 동기화되었습니다.')}
                        className="px-2.5 py-1.5 rounded-lg border border-surface-container hover:bg-surface-container text-secondary text-xs flex items-center gap-1"
                        title="캘린더에 추가"
                      >
                        <span className="material-symbols-outlined text-[15px]">event</span>
                        캘린더 알림
                      </button>
                      <button
                        onClick={() => onJoinSession(session)}
                        className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-bold shadow-xs hover:bg-primary-container transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">videocam</span>
                        입장하기
                      </button>
                    </>
                  )}

                  {session.status === 'completed' && session.canReview && (
                    <button
                      onClick={() => onOpenReview(session)}
                      className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary font-bold shadow-xs hover:bg-primary-container transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px]">rate_review</span>
                      리뷰 작성 (+3,000P)
                    </button>
                  )}

                  {session.status === 'completed' && !session.canReview && (
                    <span className="text-secondary bg-surface-container-low px-2.5 py-1 rounded text-xs border border-surface-container">
                      {session.reviewed ? '⭐ 리뷰 완료' : '세션 종료'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submitted Questions Viewer Modal */}
      {selectedSessionQuestions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-5 shadow-xl border border-surface-container">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <span className="text-xs font-bold text-primary">제출된 사전 질문지</span>
              <button
                onClick={() => setSelectedSessionQuestions(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container text-outline"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="py-3 text-xs space-y-3">
              <div>
                <span className="text-secondary block mb-1">멘토 및 주제</span>
                <p className="font-bold text-sm text-on-surface">
                  {selectedSessionQuestions.mentorName} 멘토 · {selectedSessionQuestions.topic}
                </p>
              </div>

              {selectedSessionQuestions.goals && selectedSessionQuestions.goals.length > 0 && (
                <div>
                  <span className="text-secondary block mb-1">멘토링 신청 목적</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSessionQuestions.goals.map((g, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-primary-fixed text-primary font-bold">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-secondary block mb-1">사전 질문 내용</span>
                <p className="bg-surface-container-low p-3 rounded-lg text-on-surface leading-relaxed">
                  {selectedSessionQuestions.questionsSubmitted ||
                    '사전 질문지 작성 내용이 등록되어 있습니다. 멘토가 사전 검토 후 세션을 시작합니다.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-container flex justify-end">
              <button
                onClick={() => setSelectedSessionQuestions(null)}
                className="px-4 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-on-surface"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
