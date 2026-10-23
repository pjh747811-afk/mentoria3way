import React, { useState } from 'react';
import { MOCK_MENTORS } from '../data/mockData';

interface MentorExploreProps {
  onSelectMentor: (mentorId: string) => void;
}

export const MentorExplore: React.FC<MentorExploreProps> = ({ onSelectMentor }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: '전체 멘토' },
    { id: 'backend', label: '백엔드/서버' },
    { id: 'frontend', label: '프론트엔드/모바일' },
    { id: 'ai', label: 'AI/데이터' },
    { id: 'product', label: '프로덕트/기획' },
    { id: 'startup', label: '정부지원/창업' },
  ];

  const filteredMentors = MOCK_MENTORS.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'backend') return mentor.tags.some((t) => t.includes('Spring') || t.includes('분산처리'));
    if (selectedCategory === 'ai') return mentor.tags.some((t) => t.includes('AI') || t.includes('LLM'));
    if (selectedCategory === 'product') return mentor.tags.some((t) => t.includes('기획') || t.includes('UX'));
    if (selectedCategory === 'startup') return mentor.tags.some((t) => t.includes('지원사업') || t.includes('스타트업'));
    return true;
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Title & Search Bar */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <h2 className="text-xl font-bold text-[#191c1e] mb-1">멘토 탐색 및 1:1 매칭</h2>
        <p className="text-xs text-[#434655] mb-4">
          네카라쿠배 및 유망 스타트업 현직 리더들이 실무 질문에 1:1로 답해드립니다.
        </p>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="직무, 기술스택(Spring, AI, UX), 또는 멘토명 검색..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#f7f9fb] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#004ac6] focus:bg-white transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mt-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#004ac6] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:border-[#004ac6]/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-13 h-13 rounded-full object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#191c1e]">{mentor.name}</h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#004ac6]">
                        {mentor.experienceYears}년차
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#434655]">{mentor.company} · {mentor.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  {mentor.rating} ({mentor.reviewCount})
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {mentor.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {mentor.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#f7f9fb] border border-slate-200/60 text-slate-700 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-teal-700 font-bold block">
                  빠른 예약: {mentor.availableNext}
                </span>
                <span className="text-xs font-semibold text-slate-500">{mentor.hourlyRate}</span>
              </div>
              <button
                onClick={() => onSelectMentor(mentor.id)}
                className="px-4 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] shadow-xs active:scale-95 transition-all"
              >
                1:1 멘토링 신청
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
