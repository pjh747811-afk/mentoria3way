import React, { useState, useMemo } from 'react';
import { Grant, Mentor } from '../types';

interface GrantsViewProps {
  grants: Grant[];
  mentors: Mentor[];
  onBookMentorForGrant: (mentor: Mentor, grant: Grant) => void;
  onShowToast: (msg: string) => void;
}

export const GrantsView: React.FC<GrantsViewProps> = ({
  grants,
  mentors,
  onBookMentorForGrant,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeGrant, setActiveGrant] = useState<Grant | null>(null);

  const categories = [
    { id: 'all', label: '전체 공고' },
    { id: 'startup', label: '창업/사업화' },
    { id: 'rnd', label: 'R&D/기술' },
    { id: 'voucher', label: '멘토링/바우처' },
    { id: 'marketing', label: '마케팅/판로' },
    { id: 'employment', label: '고용/인건비' },
  ];

  const filteredGrants = useMemo(() => {
    if (selectedCategory === 'all') return grants;
    return grants.filter((g) => g.category === selectedCategory);
  }, [grants, selectedCategory]);

  return (
    <div className="space-y-4 pb-8">
      {/* Top Banner */}
      <section className="bg-gradient-to-br from-surface-container-low to-surface-container-lowest rounded-xl p-5 shadow-sm border border-surface-container relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
              AI 맞춤 분석 완료
            </span>
            <span className="text-xs text-secondary">업데이트 10분 전</span>
          </div>
          <h2 className="text-xl font-bold text-on-surface">
            김멘티님을 위한 <span className="text-primary">추천 정부지원사업</span>
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            등록하신 프로필(IT/SW 초기 스타트업 창업 2년차)을 분석해 최적의 정책자금 공고를 선별했습니다.
          </p>

          <div className="mt-3 bg-surface-container-lowest rounded-lg p-3 flex items-center justify-between border border-surface-container">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">domain</span>
              </span>
              <div>
                <span className="text-xs font-bold text-on-surface">IT/SW · 초기 스타트업 (창업 2년차)</span>
                <p className="text-[11px] text-secondary">
                  적합 사업 총 <strong className="text-primary font-bold">{grants.length}건</strong> 발굴
                </p>
              </div>
            </div>
            <button
              onClick={() => onShowToast('조건 변경: 프로필 설정에서 업종 및 업력을 수정할 수 있습니다.')}
              className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-primary transition-colors text-xs flex items-center gap-0.5"
            >
              조건 변경
              <span className="material-symbols-outlined text-[14px]">tune</span>
            </button>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />
      </section>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface-variant border border-surface-container hover:bg-surface-container'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grant Policy Cards */}
      <div className="space-y-3">
        {filteredGrants.map((grant) => (
          <div
            key={grant.id}
            className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container hover:border-tertiary/40 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-secondary font-medium bg-surface-container px-2 py-0.5 rounded">
                  {grant.agency}
                </span>
                <span className="text-xs text-tertiary bg-tertiary-fixed font-bold px-2 py-0.5 rounded-full">
                  적합도 {grant.matchScore}%
                </span>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  grant.dDay <= 3
                    ? 'bg-error-container text-on-error-container animate-pulse'
                    : 'bg-secondary-fixed text-on-secondary-fixed'
                }`}
              >
                D-{grant.dDay} 마감
              </span>
            </div>

            <h3 className="text-base font-bold text-on-surface">{grant.title}</h3>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              {grant.description}
            </p>

            {/* Support amount highlighted */}
            <div className="bg-surface-container-low rounded-lg p-2.5 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-tertiary">monetization_on</span>
                <span>지원 규모:</span>
              </div>
              <span className="text-sm font-extrabold text-primary">{grant.maxFundingText}</span>
            </div>

            <div className="mt-2 text-[11px] text-secondary flex items-start gap-1">
              <span className="material-symbols-outlined text-[14px] text-outline shrink-0 mt-0.5">info</span>
              <span>지원 자격: {grant.eligibility}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {grant.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-secondary font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container">
              <button
                onClick={() => setActiveGrant(grant)}
                className="text-xs text-secondary hover:text-primary font-semibold flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                공고 상세 보기
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShowToast(`[${grant.title}] 공고가 스크랩되었습니다.`)}
                  className="p-1.5 rounded-lg border border-surface-container hover:bg-surface-container text-on-surface-variant"
                  title="스크랩"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                </button>
                <button
                  onClick={() => {
                    // Match with startup/grant mentor (이전문)
                    const startupMentor = mentors.find((m) => m.category === 'startup') || mentors[0];
                    onBookMentorForGrant(startupMentor, grant);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary text-on-tertiary text-xs font-bold shadow-xs hover:bg-tertiary-container transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[15px]">edit_document</span>
                  사업계획서 멘토링 연계
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grant Detail Modal */}
      {activeGrant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-surface-container">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <span className="text-xs font-bold text-tertiary uppercase">정부지원사업 공고 상세</span>
              <button
                onClick={() => setActiveGrant(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-outline"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-secondary bg-surface-container px-2 py-0.5 rounded">
                  {activeGrant.agency}
                </span>
                <span className="text-xs font-bold text-error bg-error-container/40 px-2 py-0.5 rounded-full">
                  D-{activeGrant.dDay}일 남음
                </span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">{activeGrant.title}</h3>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {activeGrant.description}
              </p>
            </div>

            <div className="space-y-2.5 text-xs bg-surface-container-low p-3.5 rounded-xl mb-4">
              <div className="flex justify-between">
                <span className="text-secondary font-medium">최대 지원금</span>
                <span className="font-extrabold text-primary">{activeGrant.maxFundingText}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary font-medium">주관 기관</span>
                <span className="text-on-surface font-semibold">{activeGrant.agency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary font-medium">멘티 매칭률</span>
                <span className="text-tertiary font-bold">{activeGrant.matchScore}% 일치</span>
              </div>
              <div className="pt-2 border-t border-surface-container">
                <span className="text-secondary font-medium block mb-1">지원 자격 및 대상:</span>
                <p className="text-on-surface leading-snug">{activeGrant.eligibility}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-primary-fixed/30 text-xs text-on-surface mb-4">
              <span className="font-bold text-primary block mb-1">💡 멘토리아 전용 혜택</span>
              공고 신청 전 사업계획서 1:1 현직 심사역 피드백을 바우처로 전액 지원받을 수 있습니다.
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-surface-container">
              <button
                onClick={() => setActiveGrant(null)}
                className="px-4 py-2 rounded-lg bg-surface-container text-xs font-semibold text-on-surface"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  const g = activeGrant;
                  setActiveGrant(null);
                  const startupMentor = mentors.find((m) => m.category === 'startup') || mentors[0];
                  onBookMentorForGrant(startupMentor, g);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs"
              >
                사업계획서 첨삭 신청
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
