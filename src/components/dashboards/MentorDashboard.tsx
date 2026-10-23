import React, { useState } from 'react';
import { SUB_MODULES, SubModuleInfo } from '../../data/mockData';

interface MentoringRequest {
  id: string;
  menteeName: string;
  topic: string;
  appliedDate: string;
  preferredTime: string;
  status: 'pending' | 'accepted' | 'declined';
  questions: string;
  fileAttachment?: string;
}

export const MentorDashboard: React.FC = () => {
  const [requests, setRequests] = useState<MentoringRequest[]>([
    {
      id: 'req-1',
      menteeName: '김멘티',
      topic: '대용량 분산 캐시 설계 및 이력서 포트폴리오 피드백',
      appliedDate: '오늘 10:24',
      preferredTime: '오늘 19:00 ~ 19:50',
      status: 'pending',
      questions: '1. Redis 분산 락 구현 시 락 획득 타임아웃과 동시성 제어 병목 완화 기법\n2. 주니어 백엔드 포트폴리오의 아키텍처 다이어그램 첨삭 요청',
      fileAttachment: '2024_김멘티_이력서_포트폴리오_v2.pdf',
    },
    {
      id: 'req-2',
      menteeName: '박창업 대표',
      topic: '청년창업사관학교 발표자료 BM 피드백',
      appliedDate: '어제 16:40',
      preferredTime: '10월 25일 (금) 15:00',
      status: 'pending',
      questions: '1. B2B SaaS 과금 모델의 타당성 검증 방법\n2. 심사위원이 주로 지적하는 기술 경쟁력 작성 요령',
      fileAttachment: '청창사_발표자료_초안_v1.pdf',
    },
  ]);

  const [isSlotActive, setIsSlotActive] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeReportMentee, setActiveReportMentee] = useState<string | null>(null);
  const [reportNote, setReportNote] = useState('');
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);
  const [selectedModuleModal, setSelectedModuleModal] = useState<SubModuleInfo | null>(null);

  const mentorModules = SUB_MODULES.filter((s) => s.targetRole === 'mentor');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleTriggerModule = (m: SubModuleInfo) => {
    setActiveHighlightId(m.id);
    if (m.id === 'mentor-revenue') {
      showToast('이번 달 정산금 4,250,000원에 대한 지급 청구서가 접수되었습니다.');
    } else if (m.id === 'mentor-requests') {
      showToast('신규 신청 큐 심사 섹션으로 이동했습니다. 김멘티 질문지를 확인하세요.');
    } else if (m.id === 'mentor-slots') {
      setIsSlotActive(!isSlotActive);
      showToast(`예약 슬롯 상태가 [${!isSlotActive ? 'ON (접수중)' : 'OFF (일시정지)'}]로 변경되었습니다.`);
    } else if (m.id === 'mentor-report') {
      setActiveReportMentee('김멘티');
    } else if (m.id === 'mentor-room') {
      window.open('https://meet.google.com/abc-mentoria-live', '_blank');
      showToast('구글 미트 멘토 룸으로 입장합니다.');
    } else {
      setSelectedModuleModal(m);
    }
    setTimeout(() => setActiveHighlightId(null), 3000);
  };

  const handleAcceptRequest = (id: string, menteeName: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' } : r))
    );
    showToast(`${menteeName} 님의 멘토링 요청을 수락했습니다. 구글 미트 방이 생성되었습니다.`);
  };

  const handleDeclineRequest = (id: string, menteeName: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'declined' } : r))
    );
    showToast(`${menteeName} 님에게 일정 조율 요청 알림을 발송했습니다.`);
  };

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`${activeReportMentee} 멘티에게 코칭 리포트 및 첨삭 피드백이 전송되었습니다.`);
    setActiveReportMentee(null);
    setReportNote('');
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-200">
      {/* Mentor Profile Header Banner */}
      <section className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-teal-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="김현직 멘토"
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px]">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">김현직 멘토</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950">
                  Top 1% 슈퍼멘토
                </span>
              </div>
              <p className="text-xs text-teal-200 mt-0.5">
                네카라쿠배 시니어 백엔드 아키텍트 · 11년차 · 누적 코칭 142건
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Slot Toggle */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-teal-700/60">
              <span className="text-xs text-teal-200 font-semibold">멘토링 접수:</span>
              <button
                onClick={() => {
                  setIsSlotActive(!isSlotActive);
                  showToast(
                    isSlotActive
                      ? '멘토링 신규 예약을 일시 정지했습니다.'
                      : '멘토링 신규 예약을 활성화했습니다.'
                  );
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  isSlotActive ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isSlotActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-xs font-bold text-white">
                {isSlotActive ? 'ON' : 'OFF'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-teal-800/60 text-xs">
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-teal-300 block text-[11px]">이번 달 정산 예정액</span>
            <span className="text-lg font-black text-white">4,250,000원</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-teal-300 block text-[11px]">누적 멘토링 평점</span>
            <span className="text-lg font-black text-amber-300">4.95 / 5.0</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-teal-300 block text-[11px]">진행 예정 세션</span>
            <span className="text-lg font-black text-emerald-300">3 건</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl">
            <span className="text-teal-300 block text-[11px]">대기 중인 요청</span>
            <span className="text-lg font-black text-rose-300">2 건</span>
          </div>
        </div>
      </section>

      {/* 전문가/멘토 주제의 서브 서비스 센터 6종 */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-emerald-200">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <h3 className="font-bold text-sm text-emerald-950">
              💼 전문가/멘토 특화 서브 서비스 센터 (6대 코칭 & 정산 모듈)
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            실시간 연동중
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {mentorModules.map((m) => (
            <button
              key={m.id}
              onClick={() => handleTriggerModule(m)}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-2 group cursor-pointer ${
                activeHighlightId === m.id
                  ? 'border-emerald-600 bg-emerald-50/90 ring-2 ring-emerald-200'
                  : 'border-slate-200/80 bg-[#f7f9fb] hover:bg-emerald-50/50 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {m.badge}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-emerald-600 text-[16px]">
                  touch_app
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900 group-hover:text-emerald-950 block text-xs">
                  {m.name}
                </span>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{m.desc}</p>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-0.5">
                {m.actionName} →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 1. Today's Priority Live Session Card */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-emerald-200 ring-1 ring-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">video_camera_front</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                오늘 오후 7:00 시작 (D-Day)
              </span>
              <span className="text-xs font-semibold text-slate-500">50분 온라인 1:1 세션</span>
            </div>
            <h3 className="font-bold text-base text-slate-900">
              김멘티 님과의 대용량 분산 캐시 설계 및 코드 아키텍처 코칭
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              사전 질문지 검토 완료 · 질문 2건 등록됨
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveReportMentee('김멘티')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            코칭 노트 작성
          </button>
          <a
            href="https://meet.google.com/abc-mentoria-live"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">videocam</span>
            멘토 룸 입장
          </a>
        </div>
      </section>

      {/* 2. New Mentee Requests Queue (Accept / Reschedule) */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              신규 멘토링 신청 큐 및 사전 질문지 검토
            </h3>
            <p className="text-xs text-slate-500">
              멘티가 작성한 사전 질문지와 첨부파일을 검토 후 수락해 주세요.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            정부 바우처 지원 대상건
          </span>
        </div>

        <div className="space-y-3.5">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-slate-200 bg-[#f7f9fb] hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    {req.menteeName.slice(0, 1)}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-900">{req.menteeName}</span>
                    <span className="text-xs text-slate-500 ml-2">신청 시각: {req.appliedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  희망 시간: {req.preferredTime}
                </div>
              </div>

              {/* Topic & Questions box */}
              <div className="p-3 rounded-lg bg-white border border-slate-200/70 text-xs text-slate-700 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">help</span>
                  주제: {req.topic}
                </div>
                <div className="whitespace-pre-line text-slate-600 pl-5 text-[11px] leading-relaxed">
                  {req.questions}
                </div>
                {req.fileAttachment && (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-blue-700 font-medium">
                    <span className="material-symbols-outlined text-[16px]">attach_file</span>
                    <span>첨부자료: {req.fileAttachment}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  세션당 150,000원 바우처 지원 확정
                </span>
                <div className="flex items-center gap-2">
                  {req.status === 'accepted' ? (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      수락 완료 (일정 확정됨)
                    </span>
                  ) : req.status === 'declined' ? (
                    <span className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold">
                      일정 조율 요청됨
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDeclineRequest(req.id, req.menteeName)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                      >
                        일정 조율
                      </button>
                      <button
                        onClick={() => handleAcceptRequest(req.id, req.menteeName)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        멘토링 즉시 수락
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Settlement Breakdown Card */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-base text-slate-900">
            멘토링 바우처 정산 및 계좌 입금 내역
          </h3>
          <button
            onClick={() => showToast('이번 달 정산금 4,250,000원에 대한 지급 청구서가 접수되었습니다.')}
            className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 text-xs font-bold transition-colors cursor-pointer"
          >
            정산 지급 청구하기
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[11px]">10월 완료 세션 (28건)</span>
            <span className="text-lg font-bold text-slate-800 mt-1 block">4,250,000원</span>
            <span className="text-[10px] text-emerald-600 font-semibold">10월 31일 정산 예정</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[11px]">9월 정산 완료</span>
            <span className="text-lg font-bold text-slate-800 mt-1 block">5,100,000원</span>
            <span className="text-[10px] text-slate-500">하나은행 입금 완료</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[11px]">누적 총 수익금</span>
            <span className="text-lg font-bold text-emerald-700 mt-1 block">28,450,000원</span>
            <span className="text-[10px] text-slate-500">원천징수 영수증 발급 가능</span>
          </div>
        </div>
      </section>

      {/* Sub-Module Detail Modal */}
      {selectedModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
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
              <p className="leading-relaxed bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                {selectedModuleModal.desc}
              </p>
              <div>
                <span className="font-bold text-slate-800 block mb-1">핵심 기능 및 관리 항목:</span>
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
                  showToast(`${selectedModuleModal.name} 기능이 확인되었습니다.`);
                  setSelectedModuleModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                모듈 데이터 확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coaching Note Modal */}
      {activeReportMentee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h4 className="font-bold text-base text-slate-900">
                {activeReportMentee} 멘티를 위한 코칭 피드백 리포트 작성
              </h4>
              <button
                onClick={() => setActiveReportMentee(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveReport} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  세션 핵심 조언 및 실천 과제 (Action Item)
                </label>
                <textarea
                  rows={4}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="예: 1. Redis 캐시 무효화 TTL을 30초로 단축할 것, 2. 포트폴리오 아키텍처 다이어그램에 데이터 흐름 순서 번호 기입 권장"
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white resize-none"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveReportMentee(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  리포트 발행 및 멘티 전송
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in z-50">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
