import React, { useState } from 'react';

interface MyPageProps {
  onOpenApplication: () => void;
}

export const MyPage: React.FC<MyPageProps> = ({ onOpenApplication }) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Profile Card */}
      <div className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/80 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 shadow-inner">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                alt="김멘티 프로필"
              />
              <button
                onClick={() => showToast('프로필 이미지 변경 창을 엽니다.')}
                aria-label="프로필 이미지 변경"
                className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#004ac6] text-white flex items-center justify-center shadow-md hover:bg-blue-700"
              >
                <span className="material-symbols-outlined text-[12px]">photo_camera</span>
              </button>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#191c1e] truncate">김멘티</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-[#004ac6] text-xs font-bold">
                  성장 레벨 2
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">예비 창업가 · 주니어 백엔드 취준생</p>
            </div>
          </div>
          <button
            onClick={() => showToast('프로필 정보 수정 모드로 전환합니다.')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs font-semibold shrink-0 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px] text-slate-500">edit</span>
            수정
          </button>
        </div>

        {/* 3 Metric counters */}
        <div className="grid grid-cols-3 gap-2 bg-[#f7f9fb] rounded-xl p-2.5">
          <div
            onClick={() => showToast('신청 및 진행 중인 멘토링 3건이 있습니다.')}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-white text-center shadow-2xs cursor-pointer hover:bg-blue-50 transition-colors"
          >
            <span className="text-xs text-slate-500 font-medium">신청/진행</span>
            <span className="text-xl sm:text-2xl text-[#004ac6] font-extrabold mt-0.5">
              3<span className="text-xs font-bold ml-0.5">건</span>
            </span>
          </div>
          <div
            onClick={() => showToast('지금까지 5건의 세션을 성공적으로 완료했습니다.')}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-white text-center shadow-2xs cursor-pointer hover:bg-teal-50 transition-colors"
          >
            <span className="text-xs text-slate-500 font-medium">완료 세션</span>
            <span className="text-xl sm:text-2xl text-teal-700 font-extrabold mt-0.5">
              5<span className="text-xs font-bold ml-0.5">건</span>
            </span>
          </div>
          <div
            onClick={() => showToast('관심 멘토 및 스크랩 8건 목록으로 이동합니다.')}
            className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-white text-center shadow-2xs cursor-pointer hover:bg-amber-50 transition-colors"
          >
            <span className="text-xs text-slate-500 font-medium">북마크/찜</span>
            <span className="text-xl sm:text-2xl text-slate-800 font-extrabold mt-0.5">
              8<span className="text-xs font-bold ml-0.5">건</span>
            </span>
          </div>
        </div>

        {/* Voucher Point Banner */}
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50/80 border border-blue-200/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#004ac6]">monetization_on</span>
            <span className="text-xs font-bold text-slate-800">나의 멘토링 바우처 포인트</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-[#004ac6]">12,500</span>
            <span className="text-xs font-bold text-[#004ac6]">P</span>
          </div>
        </div>
      </div>

      {/* Management Menu List */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          멘토링 관리
        </h3>

        <button
          onClick={onOpenApplication}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#004ac6]">post_add</span>
            <div>
              <span className="text-sm font-semibold text-slate-800 block">사전 질문지 작성 및 수정</span>
              <span className="text-[11px] text-slate-500">예정된 세션 전 멘토에게 질문을 전달하세요</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
        </button>

        <button
          onClick={() => showToast('멘토 피드백 및 코칭 리포트 5건이 보관되어 있습니다.')}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-teal-700">history_edu</span>
            <div>
              <span className="text-sm font-semibold text-slate-800 block">멘토 코칭 리포트 보관함</span>
              <span className="text-[11px] text-slate-500">완료된 세션별 핵심 서머리와 추천 자료</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
        </button>

        <button
          onClick={() => showToast('지원사업 서류 첨삭 이력 화면으로 이동합니다.')}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-indigo-600">file_copy</span>
            <div>
              <span className="text-sm font-semibold text-slate-800 block">사업계획서 첨삭 이력</span>
              <span className="text-[11px] text-slate-500">청년창업사관학교 외 2건 첨삭 완료</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
        </button>
      </div>

      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-full shadow-xl animate-in fade-in">
          {toastMsg}
        </div>
      )}
    </div>
  );
};
