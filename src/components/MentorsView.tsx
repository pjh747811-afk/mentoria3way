import React, { useState, useMemo } from 'react';
import { Mentor } from '../types';

interface MentorsViewProps {
  mentors: Mentor[];
  onBookMentor: (mentor: Mentor) => void;
  onShowToast: (msg: string) => void;
}

export const MentorsView: React.FC<MentorsViewProps> = ({
  mentors,
  onBookMentor,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [instantOnly, setInstantOnly] = useState<boolean>(false);
  const [highExpOnly, setHighExpOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'popular' | 'rating' | 'reviews'>('popular');
  const [activeMentorDetail, setActiveMentorDetail] = useState<Mentor | null>(null);

  const categories = [
    { id: 'all', label: '전체' },
    { id: 'dev', label: '개발/IT' },
    { id: 'pm', label: '기획/PM' },
    { id: 'marketing', label: '마케팅/그로스' },
    { id: 'design', label: '디자인' },
    { id: 'data', label: '데이터/AI' },
    { id: 'startup', label: '창업/BM' },
    { id: 'ir', label: '투자/IR' },
  ];

  const filteredMentors = useMemo(() => {
    return mentors
      .filter((m) => {
        if (selectedCategory !== 'all' && m.category !== selectedCategory) return false;
        if (instantOnly && !m.isInstantAvailable) return false;
        if (highExpOnly && m.reviewCount < 100) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = m.name.toLowerCase().includes(q);
          const matchCompany = m.company.toLowerCase().includes(q);
          const matchRole = m.role.toLowerCase().includes(q);
          const matchTag = m.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCompany && !matchRole && !matchTag) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'rating') return b.rating - a.rating;
        if (sortOption === 'reviews') return b.reviewCount - a.reviewCount;
        return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
      });
  }, [mentors, selectedCategory, instantOnly, highExpOnly, searchQuery, sortOption]);

  return (
    <div className="space-y-4 pb-8">
      {/* Header & Search */}
      <div className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-on-surface">현직자 멘토 탐색</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              검증된 현직자와 1:1 라이브로 커리어와 사업 고민을 해결하세요.
            </p>
          </div>
          <span className="text-xs text-primary font-bold bg-primary-fixed px-2.5 py-1 rounded-full">
            바우처 100% 무료
          </span>
        </div>

        {/* Search input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="멘토명, 회사, 직무, 기술 태그(#대용량트래픽, #IR) 검색"
            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters & Sort */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInstantOnly(!instantOnly)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all ${
                instantOnly
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary font-bold'
                  : 'bg-surface-container-low text-on-surface-variant border-transparent'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              실시간 상담 가능
            </button>
            <button
              onClick={() => setHighExpOnly(!highExpOnly)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all ${
                highExpOnly
                  ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary font-bold'
                  : 'bg-surface-container-low text-on-surface-variant border-transparent'
              }`}
            >
              멘토링 100회+
            </button>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-secondary text-[11px]">정렬:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer"
            >
              <option value="popular">추천순</option>
              <option value="rating">평점 높은순</option>
              <option value="reviews">멘토링 횟수순</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mentor Cards List */}
      <div className="space-y-3">
        {filteredMentors.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center border border-surface-container">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">person_off</span>
            <h3 className="text-sm font-bold text-on-surface">조건에 맞는 멘토가 없습니다</h3>
            <p className="text-xs text-on-surface-variant mt-1">검색어나 필터 조건을 변경해 보세요.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setInstantOnly(false);
                setHighExpOnly(false);
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-primary"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-sm border border-surface-container hover:border-primary/40 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-surface-container shrink-0 shadow-sm">
                    <img src={mentor.avatarUrl} alt={mentor.name} className="w-full h-full object-cover" />
                    {mentor.isInstantAvailable && (
                      <span
                        className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-tertiary border-2 border-white"
                        title="실시간 상담 대기 중"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-on-surface">{mentor.name} 멘토</h3>
                      <span className="text-xs text-primary bg-primary-fixed/50 px-2 py-0.5 rounded font-bold">
                        {mentor.categoryLabel}
                      </span>
                      <span className="text-xs text-secondary bg-surface-container-low px-1.5 py-0.5 rounded">
                        {mentor.careerYears}년차
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5 truncate">
                      {mentor.role} · {mentor.company}
                    </p>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-3 mt-1.5 text-xs">
                      <span className="flex items-center gap-1 font-bold text-primary">
                        <span className="material-symbols-outlined text-[15px]">star</span>
                        {mentor.rating.toFixed(1)}
                      </span>
                      <span className="text-on-surface-variant">
                        멘토링 <strong className="text-on-surface">{mentor.reviewCount}</strong>회
                      </span>
                      <span className="text-tertiary font-medium">
                        만족도 {mentor.satisfactionRate}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="inline-block text-[11px] font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded">
                    {mentor.priceText}
                  </span>
                  <div className="text-[11px] text-on-surface-variant mt-1">
                    예약 가능: <strong className="text-primary">{mentor.nextAvailableTime}</strong>
                  </div>
                </div>
              </div>

              {/* Introduction quote */}
              <p className="text-xs text-on-surface bg-surface-container-low/70 p-2.5 rounded-lg mt-3 leading-relaxed">
                "{mentor.introduction}"
              </p>

              {/* Tag chips */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {mentor.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container text-secondary font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-container">
                <button
                  onClick={() => setActiveMentorDetail(mentor)}
                  className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  멘토 상세 소개
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onShowToast(`${mentor.name} 멘토가 관심 목록에 저장되었습니다.`);
                    }}
                    className="p-2 rounded-lg border border-surface-container hover:bg-surface-container text-on-surface-variant transition-colors"
                    title="찜하기"
                  >
                    <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
                  </button>
                  <button
                    onClick={() => onBookMentor(mentor)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-container transition-all active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                    사전 질문지 & 멘토링 신청
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Mentor Detail Modal */}
      {activeMentorDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-xl border border-surface-container">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <span className="text-xs font-bold text-primary uppercase">멘토 프로필 상세</span>
              <button
                onClick={() => setActiveMentorDetail(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-outline"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-4 py-4">
              <img
                src={activeMentorDetail.avatarUrl}
                alt={activeMentorDetail.name}
                className="w-16 h-16 rounded-full object-cover border border-primary/20"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-on-surface">{activeMentorDetail.name} 멘토</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                    현직 인증 완료
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">{activeMentorDetail.company}</p>
                <p className="text-xs text-secondary font-medium">{activeMentorDetail.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-surface-container-low rounded-xl text-center mb-4">
              <div>
                <div className="text-base font-extrabold text-primary">{activeMentorDetail.rating.toFixed(1)}</div>
                <div className="text-[11px] text-on-surface-variant">평균 평점</div>
              </div>
              <div>
                <div className="text-base font-extrabold text-on-surface">{activeMentorDetail.reviewCount}회</div>
                <div className="text-[11px] text-on-surface-variant">누적 멘토링</div>
              </div>
              <div>
                <div className="text-base font-extrabold text-tertiary">{activeMentorDetail.satisfactionRate}%</div>
                <div className="text-[11px] text-on-surface-variant">추천 만족도</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-on-surface text-sm mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">target</span>
                  이런 분께 추천해요
                </h4>
                <div className="space-y-1.5 bg-surface-container-low p-3 rounded-lg">
                  {activeMentorDetail.recommendedFor.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[14px] text-primary mt-0.5">check</span>
                      <span className="text-on-surface leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-on-surface text-sm mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">chat</span>
                  멘토의 한마디
                </h4>
                <p className="text-on-surface bg-surface-container-low p-3 rounded-lg leading-relaxed">
                  {activeMentorDetail.introduction}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-surface-container flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveMentorDetail(null)}
                className="px-4 py-2 rounded-lg bg-surface-container text-xs font-semibold text-on-surface"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  const m = activeMentorDetail;
                  setActiveMentorDetail(null);
                  onBookMentor(m);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs"
              >
                멘토링 신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
