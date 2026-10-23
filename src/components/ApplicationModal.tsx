import React, { useState } from 'react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorName?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  mentorName = '김현직 멘토',
}) => {
  const [goal, setGoal] = useState('career');
  const [questionText, setQuestionText] = useState(
    '1. 대용량 트래픽 환경에서 Redis 캐시 전략과 동시성 제어(분산 락) 구현 시 발생할 수 있는 병목점에 대해 자문을 구하고 싶습니다.\n2. 현재 준비 중인 이력서의 프로젝트 기술 스택 어필 방향이 적절한지 피드백 부탁드립니다.'
  );
  const [fileName, setFileName] = useState('2024_김멘티_이력서_포트폴리오_v2.pdf');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#004ac6] text-[11px] font-extrabold">
              STEP 2/2
            </span>
            <h3 className="font-bold text-base text-[#191c1e]">사전 질문지 및 세션 확정</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-3xl animate-bounce">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">신청서가 성공적으로 전달되었습니다!</h4>
            <p className="text-xs text-slate-600 max-w-xs">
              {mentorName} 님이 질문지를 확인한 후 세션을 확정합니다. 구글 미트 링크는 카카오 알림톡으로도 발송됩니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Session info summary */}
            <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-slate-200/60 space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt={mentorName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-[#191c1e]">{mentorName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 text-[#004ac6] font-bold">11년차</span>
                  </div>
                  <span className="text-xs text-slate-500">네카라쿠배 시니어 백엔드 리드</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs text-[#004ac6] font-semibold">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span>2024년 10월 17일 (목) 오후 07:00 ~ 07:50 (50분)</span>
              </div>
            </div>

            {/* Purpose Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                멘토링 신청 목적 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'career', label: '취업 / 이직 / 커리어 코칭' },
                  { id: 'tech', label: '실무 기술 아키텍처 코드리뷰' },
                  { id: 'startup', label: '정부지원사업/사업계획서 첨삭' },
                  { id: 'general', label: '기타 심층 고민 상담' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setGoal(item.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      goal === item.id
                        ? 'border-[#004ac6] bg-blue-50/70 text-[#004ac6] font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Questions */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                사전 질문 작성 (세션 만족도를 높이는 핵심 내용) <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
                placeholder="멘토님께 궁금한 점, 고민 중인 상황을 구체적으로 적어주세요."
                className="w-full p-3 text-xs bg-[#f7f9fb] border border-slate-200 rounded-xl focus:outline-none focus:border-[#004ac6] focus:bg-white resize-none"
              />
            </div>

            {/* File Attachment */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                사전 참고 자료 및 이력서 (선택)
              </label>
              <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">attach_file</span>
                  <span className="text-slate-700 truncate font-medium">{fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFileName('새_포트폴리오_2024.pdf')}
                  className="text-xs text-[#004ac6] font-bold hover:underline shrink-0"
                >
                  변경
                </button>
              </div>
            </div>

            {/* Voucher Check */}
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200/70 flex items-center justify-between text-xs text-teal-800">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>정부 청년 멘토링 바우처 전액 지원 (본인부담금 0원)</span>
              </div>
              <span className="font-extrabold text-teal-900">0 원</span>
            </div>

            {/* Submit button */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] shadow-sm transition-all"
              >
                신청서 제출 및 예약 확정
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
