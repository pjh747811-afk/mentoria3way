import React, { useState } from 'react';
import { MOCK_MENTORS, MOCK_GRANTS, MOCK_SESSIONS, SUB_MODULES, SubModuleInfo } from '../../data/mockData';

interface MenteeDashboardProps {
  onOpenApplication: (mentorId?: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const MenteeDashboard: React.FC<MenteeDashboardProps> = ({
  onOpenApplication,
  onNavigateTab,
}) => {
  const [voucherPoints, setVoucherPoints] = useState(12500);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);
  const [selectedModuleModal, setSelectedModuleModal] = useState<SubModuleInfo | null>(null);

  const menteeModules = SUB_MODULES.filter((s) => s.targetRole === 'mentee');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleChargeVoucher = () => {
    setVoucherPoints((prev) => prev + 10000);
    showToast('정부 청년창업 바우처 10,000 포인트가 추가 지급되었습니다! (잔액: ' + (voucherPoints + 10000).toLocaleString() + 'P)');
  };

  const handleTriggerModule = (m: SubModuleInfo) => {
    setActiveHighlightId(m.id);
    if (m.id === 'mentee-questionnaire') {
      onOpenApplication('m1');
    } else if (m.id === 'mentee-wallet') {
      handleChargeVoucher();
    } else if (m.id === 'mentee-room') {
      window.open('https://meet.google.com/abc-mentoria-live', '_blank');
      showToast('1:1 온라인 LIVE 화상 미팅룸으로 연결합니다.');
    } else if (m.targetTab !== 'dashboard') {
      onNavigateTab(m.targetTab);
    } else {
      setSelectedModuleModal(m);
    }
    setTimeout(() => setActiveHighlightId(null), 3000);
  };

  const upcomingSession = MOCK_SESSIONS.find((s) => s.status === 'upcoming');

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-200">
      {/* 1. Mentee Hero Header */}
      <section className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-blue-900 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                alt="김멘티"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-400 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px]">
                ★
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">김멘티 창업가</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-400 text-blue-950">
                  성장 레벨 2
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                예비 창업가 · 주니어 백엔드 취준생 · 목표: 청년창업사관학교 14기 합격
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => onOpenApplication('m1')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              새 1:1 멘토링 신청
            </button>
            <button
              onClick={handleChargeVoucher}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">redeem</span>
              바우처 신청
            </button>
          </div>
        </div>

        {/* 4 Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-blue-900/60 text-xs">
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-blue-300 block text-[11px]">나의 바우처 잔액</span>
            <span className="text-lg font-black text-amber-300">{voucherPoints.toLocaleString()} P</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-blue-300 block text-[11px]">진행 예정 세션</span>
            <span className="text-lg font-black text-white">3 건</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-blue-300 block text-[11px]">완료된 코칭</span>
            <span className="text-lg font-black text-emerald-300">5 회</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-blue-300 block text-[11px]">관심 지원사업</span>
            <span className="text-lg font-black text-blue-300">D-3 청창사</span>
          </div>
        </div>
      </section>

      {/* 멘티/창업자 주제의 서브 서비스 센터 11종 */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-blue-200">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-blue-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h3 className="font-bold text-sm text-blue-950">
              🚀 멘티/창업자 특화 서브 서비스 센터 (11대 맞춤 성장 모듈)
            </h3>
          </div>
          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
            11개 서브센터 가동중
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {menteeModules.map((m) => (
            <button
              key={m.id}
              onClick={() => handleTriggerModule(m)}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-1.5 group cursor-pointer ${
                activeHighlightId === m.id
                  ? 'border-blue-600 bg-blue-50/90 ring-2 ring-blue-200'
                  : 'border-slate-200/80 bg-[#f7f9fb] hover:bg-blue-50/50 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {m.badge}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 text-[16px]">
                  touch_app
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900 group-hover:text-blue-950 truncate block text-xs">
                  {m.name}
                </span>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{m.desc}</p>
              </div>
              <span className="text-[11px] text-blue-700 font-bold flex items-center gap-0.5">
                {m.actionName} →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. 4-Stage Startup Growth Roadmap */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              김멘티 님의 스타트업 성장 로드맵
            </h3>
            <p className="text-xs text-slate-500">
              아이디어부터 정부자금 합격까지 단계별 전담 멘토가 동행합니다.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            현재 2단계 진행 중 (70%)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-2">
          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-500">STEP 1</span>
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
            </div>
            <h4 className="text-xs font-bold text-slate-800">BM & 타겟 검증</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">이민영 멘토 CPO 코칭 완료</p>
          </div>

          {/* Step 2 (Active) */}
          <div className="p-3 rounded-xl bg-blue-50/80 border-2 border-blue-500 shadow-xs relative">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-blue-700">STEP 2 (진행중)</span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            </div>
            <h4 className="text-xs font-bold text-blue-900">MVP 개발 & 코드리뷰</h4>
            <p className="text-[11px] text-blue-700 mt-0.5">김현직 멘토 1:1 아키텍처 점검</p>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 opacity-80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-400">STEP 3</span>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">lock</span>
            </div>
            <h4 className="text-xs font-bold text-slate-700">정부지원사업 합격</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">청창사 1억원 사업계획서 첨삭</p>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 opacity-60">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-400">STEP 4</span>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">lock</span>
            </div>
            <h4 className="text-xs font-bold text-slate-700">시드 투자 & IR 데모데이</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">VC 심사역 모의 피칭 연결</p>
          </div>
        </div>
      </section>

      {/* 3. Today's Upcoming Live Session */}
      {upcomingSession && (
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={upcomingSession.mentorAvatar}
              alt={upcomingSession.mentorName}
              className="w-13 h-13 rounded-full object-cover border-2 border-white/40"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/40 text-blue-200 text-[11px] font-bold">
                  오늘 19:00 예정
                </span>
                <span className="text-xs text-blue-200">구글 미트 화상 룸</span>
              </div>
              <h4 className="font-bold text-base text-white">{upcomingSession.mentorName} 세션</h4>
              <p className="text-xs text-blue-100 mt-0.5 truncate">{upcomingSession.topic}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={() => onOpenApplication('m1')}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
            >
              질문지 확인
            </button>
            <a
              href={upcomingSession.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">videocam</span>
              화상룸 입장
            </a>
          </div>
        </section>
      )}

      {/* 4. Recommended Mentors and Grant Matching in 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Recommended Mentors */}
        <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-slate-900">추천 현직자 멘토</h3>
              <button
                onClick={() => onNavigateTab('explore')}
                className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
              >
                전체보기 →
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_MENTORS.slice(0, 2).map((m) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-[#f7f9fb] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-900">{m.name} ({m.experienceYears}년차)</h5>
                      <p className="text-[11px] text-slate-500">{m.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenApplication(m.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
                  >
                    신청
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right: Urgent Grants */}
        <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-slate-900">마감 임박 지원사업</h3>
              <button
                onClick={() => onNavigateTab('grants')}
                className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
              >
                공고보기 →
              </button>
            </div>
            <div className="space-y-3">
              {MOCK_GRANTS.slice(0, 2).map((g) => (
                <div
                  key={g.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-[#f7f9fb] flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600">
                        D-{g.dDay}
                      </span>
                      <span className="text-xs font-bold text-slate-800 truncate">{g.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{g.budget} · {g.target}</p>
                  </div>
                  <button
                    onClick={() => onNavigateTab('grants')}
                    className="text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Sub-Module Detail Modal */}
      {selectedModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  {selectedModuleModal.badge}
                </span>
                <h4 className="font-bold text-base text-slate-900">{selectedModuleModal.name}</h4>
              </div>
              <button
                onClick={() => setSelectedModuleModal(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="leading-relaxed bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                {selectedModuleModal.desc}
              </p>
              <div>
                <span className="font-bold text-slate-800 block mb-1">핵심 서비스 구성:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  {selectedModuleModal.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedModuleModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  showToast(`${selectedModuleModal.name} 모듈이 로드되었습니다.`);
                  setSelectedModuleModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                모듈 데이터 확인
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in z-50">
          <span className="material-symbols-outlined text-blue-400 text-[18px]">info</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
