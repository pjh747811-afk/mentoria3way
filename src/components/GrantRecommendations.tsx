import React, { useState } from 'react';
import { MOCK_GRANTS } from '../data/mockData';

interface GrantRecommendationsProps {
  onRequestReview: (grantTitle: string) => void;
}

export const GrantRecommendations: React.FC<GrantRecommendationsProps> = ({ onRequestReview }) => {
  const [grants, setGrants] = useState(MOCK_GRANTS);

  const toggleBookmark = (id: string) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isBookmarked: !g.isBookmarked } : g))
    );
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <h2 className="text-xl font-bold text-[#191c1e]">맞춤형 지원사업 & 정책자금 추천</h2>
            <p className="text-xs text-[#434655]">
              스타트업 업력, 기술 분야, 대표자 연령을 분석하여 최적의 정부 과제를 추천합니다.
            </p>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200/60 self-start sm:self-auto">
            청년 우대 가점 해당
          </span>
        </div>

        {/* Diagnosis Card */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">나의 지원 자격 진단: 청년 예비창업자 (합격률 87%)</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                청년창업사관학교, 예비창업패키지, 기술보증기금 청년우대 3대 트랙 추천 완료
              </p>
            </div>
          </div>
          <button
            onClick={() => onRequestReview('정부지원사업 자격 정밀진단')}
            className="px-3.5 py-2 rounded-lg bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] transition-colors shrink-0 shadow-xs"
          >
            멘토 첨삭 상담
          </button>
        </div>
      </div>

      {/* Grants Cards */}
      <div className="space-y-3">
        {grants.map((grant) => (
          <div
            key={grant.id}
            className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-50 text-rose-600 border border-rose-200">
                    D-{grant.dDay}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{grant.organization}</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {grant.category}
                  </span>
                </div>
                <button
                  onClick={() => toggleBookmark(grant.id)}
                  className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors ${
                    grant.isBookmarked ? 'text-amber-500' : 'text-slate-400'
                  }`}
                  aria-label="북마크"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={grant.isBookmarked ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    bookmark
                  </span>
                </button>
              </div>

              <h3 className="font-bold text-base text-[#191c1e] mb-1.5">{grant.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">{grant.summary}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#f7f9fb] p-3 rounded-xl mb-4">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="material-symbols-outlined text-[16px] text-[#004ac6]">monetization_on</span>
                  <span className="font-semibold">지원 한도:</span> {grant.budget}
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="material-symbols-outlined text-[16px] text-teal-700">person</span>
                  <span className="font-semibold">신청 대상:</span> {grant.target}
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 sm:col-span-2">
                  <span className="material-symbols-outlined text-[16px] text-rose-600">event_busy</span>
                  <span className="font-semibold">접수 마감:</span> {grant.deadline}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">
                K-Startup 원문 공고 연동
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRequestReview(grant.title)}
                  className="px-3.5 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  합격 멘토에게 사업계획서 첨삭 신청
                </button>
                <a
                  href="https://www.k-startup.go.kr"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] transition-colors"
                >
                  원문 공고 확인
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
