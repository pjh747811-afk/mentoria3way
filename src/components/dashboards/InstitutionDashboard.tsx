import React, { useState } from 'react';
import { SUB_MODULES, SubModuleInfo } from '../../data/mockData';

interface SettlementItem {
  id: string;
  mentorName: string;
  mentorCompany: string;
  sessionsCount: number;
  totalAmount: number;
  status: 'pending' | 'approved';
  period: string;
  menteeNames: string[];
}

export const InstitutionDashboard: React.FC = () => {
  const [settlements, setSettlements] = useState<SettlementItem[]>([
    {
      id: 'settle-1',
      mentorName: '김현직 멘토',
      mentorCompany: '네카라쿠배 테크',
      sessionsCount: 12,
      totalAmount: 1800000,
      status: 'pending',
      period: '2024년 10월 1주~3주',
      menteeNames: ['김멘티 (백엔드)', '이창업 (핀테크)', '박대표 (AI솔루션)'],
    },
    {
      id: 'settle-2',
      mentorName: '이민영 멘토',
      mentorCompany: '시리즈B 스타트업',
      sessionsCount: 8,
      totalAmount: 1200000,
      status: 'pending',
      period: '2024년 10월 2주',
      menteeNames: ['최대표 (청창사 지원)', '정스타트 (초창패)'],
    },
    {
      id: 'settle-3',
      mentorName: '정유진 멘토',
      mentorCompany: '토스 커뮤니티',
      sessionsCount: 6,
      totalAmount: 900000,
      status: 'approved',
      period: '2024년 9월 4주',
      menteeNames: ['송디자인', '한기획'],
    },
  ]);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [selectedAuditPeriod, setSelectedAuditPeriod] = useState('2024년 3분기');
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);
  const [selectedModuleModal, setSelectedModuleModal] = useState<SubModuleInfo | null>(null);

  const institutionModules = SUB_MODULES.filter((s) => s.targetRole === 'institution');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApprove = (id: string) => {
    setSettlements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
    );
    showToast('바우처 정산이 승인되어 예산 지출 시스템으로 전송되었습니다.');
  };

  const handleApproveAll = () => {
    setSettlements((prev) => prev.map((s) => ({ ...s, status: 'approved' })));
    showToast('대기 중인 모든 멘토링 바우처 정산 2건이 일괄 승인되었습니다.');
  };

  const handleTriggerModule = (module: SubModuleInfo) => {
    setActiveHighlightId(module.id);
    if (module.id === 'inst-report') {
      showToast('공공감사용 2024년도 멘토링 예산 집행 공식 PDF 리포트가 생성되었습니다.');
    } else if (module.id === 'inst-settle') {
      showToast('전문가 멘토링비 정산 대기 큐로 스크롤되었습니다. 아래 목록에서 일괄 승인 가능합니다.');
    } else {
      setSelectedModuleModal(module);
    }
    setTimeout(() => setActiveHighlightId(null), 3000);
  };

  const pendingCount = settlements.filter((s) => s.status === 'pending').length;

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-200">
      {/* Institution Banner */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-indigo-900 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </span>
            <div>
              <span className="text-[11px] font-extrabold text-indigo-300 uppercase tracking-wider block">
                Public Governance & Accelerator Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                중소벤처기업진흥공단 · 창업진흥원 거버넌스 총괄
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <select
              value={selectedAuditPeriod}
              onChange={(e) => setSelectedAuditPeriod(e.target.value)}
              className="bg-slate-800/80 border border-indigo-700/60 rounded-xl px-3 py-1.5 text-xs font-semibold text-indigo-200 focus:outline-none"
            >
              <option>2024년 4분기 (진행중)</option>
              <option>2024년 3분기</option>
              <option>2024년 2분기</option>
              <option>2024년 1분기</option>
            </select>
            <button
              onClick={() => showToast('공공감사용 2024년도 멘토링 예산 집행 공식 PDF 리포트가 생성되었습니다.')}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              감사 리포트 다운로드
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-indigo-200/90 max-w-3xl leading-relaxed">
          청년창업 활성화 및 혁신 스타트업을 위한 정부 멘토링 바우처 총괄 관리 대시보드입니다. 
          실시간 부정수급 모니터링, 회계 정산 감사 승인, 수혜 기업의 후속 성과를 투명하게 추적합니다.
        </p>
      </section>

      {/* 기관/거버넌스 주제의 서브 서비스 센터 8종 */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-indigo-200">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-indigo-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
            <h3 className="font-bold text-sm text-indigo-950">
              🏛️ 기관 거버넌스 특화 서브 서비스 센터 (8대 행정 모듈)
            </h3>
          </div>
          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            8개 서브센터 운영중
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {institutionModules.map((m) => (
            <button
              key={m.id}
              onClick={() => handleTriggerModule(m)}
              className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-2 group cursor-pointer ${
                activeHighlightId === m.id
                  ? 'border-indigo-600 bg-indigo-50/90 ring-2 ring-indigo-200'
                  : 'border-slate-200/80 bg-[#f7f9fb] hover:bg-indigo-50/50 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  {m.badge}
                </span>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-600 text-[16px]">
                  open_in_new
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-900 group-hover:text-indigo-950 truncate block text-xs">
                  {m.name}
                </span>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{m.desc}</p>
              </div>
              <span className="text-[11px] text-indigo-700 font-bold flex items-center gap-0.5">
                {m.actionName} →
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 1. Core Budget & Voucher Execution Metrics (4 Cards) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">총 바우처 예산</span>
            <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[17px]">account_balance_wallet</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">15.0<span className="text-sm font-bold text-slate-500 ml-1">억원</span></span>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>집행률: 68.4%</span>
              <span className="font-bold text-indigo-700">10억 2,600만</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">수혜 창업기업</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[17px]">corporate_fare</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">128<span className="text-sm font-bold text-slate-500 ml-1">개사</span></span>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>기업 생존율</span>
              <span className="font-bold text-emerald-700">94.2%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">후속 투자 유치액</span>
            <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[17px]">trending_up</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-purple-700">42.8<span className="text-sm font-bold text-slate-500 ml-1">억원</span></span>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>신규 고용 창출</span>
              <span className="font-bold text-purple-700">+342명</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold">품질 만족도 & 감사</span>
            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[17px]">verified_user</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">4.94<span className="text-sm font-bold text-slate-500 ml-1">/ 5.0</span></span>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span>이상징후/부정수급</span>
              <span className="font-bold text-emerald-600">0 건 (클린)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Budget Progress Bar */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800">2024년도 공공 멘토링 바우처 예산 집행 현황 (진행율 68.4%)</span>
          <span className="text-xs font-bold text-indigo-700">잔여: 4억 7,400만원</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="h-full bg-indigo-600 rounded-full" style={{ width: '68.4%' }}></div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100">
          <div>
            <span className="text-slate-400 block text-[11px]">총 배정 예산</span>
            <span className="font-bold text-slate-700">1,500,000,000원</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">정산 완료 지출액</span>
            <span className="font-bold text-indigo-700">1,026,000,000원</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">집행 가능 잔액</span>
            <span className="font-bold text-emerald-700">474,000,000원</span>
          </div>
        </div>
      </section>

      {/* 3. Pending Settlement Approval Queue (Active Interaction) */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900">
                전문가 멘토링비 정산 승인 대기 큐
              </h3>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                  {pendingCount}건 대기
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              멘토가 작성한 세션 코칭 완료 리포트 및 출석 서명이 검증된 건만 승인 대기 목록에 표시됩니다.
            </p>
          </div>

          {pendingCount > 0 && (
            <button
              onClick={handleApproveAll}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">done_all</span>
              전체 일괄 승인 ({pendingCount}건)
            </button>
          )}
        </div>

        <div className="space-y-3">
          {settlements.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                item.status === 'approved'
                  ? 'bg-slate-50 border-slate-200 opacity-75'
                  : 'bg-white border-indigo-200/80 shadow-2xs hover:border-indigo-400'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                      item.status === 'approved'
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {item.mentorName.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{item.mentorName}</span>
                      <span className="text-xs text-slate-500">{item.mentorCompany}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.period}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                      <span>완료 세션: <strong>{item.sessionsCount}회</strong></span>
                      <span>·</span>
                      <span>수혜 멘티: {item.menteeNames.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">정산 청구액</span>
                    <span className="text-base font-extrabold text-slate-900">
                      {item.totalAmount.toLocaleString()}원
                    </span>
                  </div>

                  {item.status === 'approved' ? (
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center gap-1 border border-emerald-200">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      승인 완료
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      회계 승인
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Supported Grant Programs Monitoring */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <h3 className="font-bold text-base text-slate-900 mb-3">
          현재 운영 중인 공공 창업 지원 트랙 (3종)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              D-3 접수 마감
            </span>
            <h4 className="font-bold text-sm text-slate-900 mt-2">청년창업사관학교 가을학기</h4>
            <p className="text-xs text-slate-500 mt-1">경쟁률 4.8:1 · 멘토 사전 첨삭 142건 완료</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              D-8 심사 준비
            </span>
            <h4 className="font-bold text-sm text-slate-900 mt-2">초기창업패키지 기술 PoC 트랙</h4>
            <p className="text-xs text-slate-500 mt-1">서류 심사위원 12인 풀 구성 완료</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              상시 모집 중
            </span>
            <h4 className="font-bold text-sm text-slate-900 mt-2">기술보증기금 청년우대 바우처</h4>
            <p className="text-xs text-slate-500 mt-1">누적 보증 연계액 28.5억원 돌파</p>
          </div>
        </div>
      </section>

      {/* Sub-Module Detail Modal */}
      {selectedModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
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
              <p className="leading-relaxed bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                {selectedModuleModal.desc}
              </p>
              <div>
                <span className="font-bold text-slate-800 block mb-1">핵심 행정 및 감사 항목:</span>
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
                  showToast(`${selectedModuleModal.name} 시스템 연동이 확인되었습니다.`);
                  setSelectedModuleModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                모듈 데이터 확인
              </button>
            </div>
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
