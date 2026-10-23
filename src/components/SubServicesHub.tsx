import React, { useState } from 'react';
import { SUB_MODULES, SubModuleInfo } from '../data/mockData';
import { UserRole } from './SpectrumRoleBar';

interface SubServicesHubProps {
  onActivateModule: (role: UserRole, tabId: string, actionName?: string) => void;
}

export const SubServicesHub: React.FC<SubServicesHubProps> = ({ onActivateModule }) => {
  const [filterRole, setFilterRole] = useState<'all' | 'institution' | 'mentor' | 'mentee'>('all');
  const [selectedModule, setSelectedModule] = useState<SubModuleInfo>(SUB_MODULES[0]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [previewModule, setPreviewModule] = useState<SubModuleInfo | null>(null);

  const filteredModules = SUB_MODULES.filter((s) => {
    if (filterRole === 'all') return true;
    return s.targetRole === filterRole;
  });

  const roleCounters = {
    all: SUB_MODULES.length,
    institution: SUB_MODULES.filter((s) => s.targetRole === 'institution').length,
    mentor: SUB_MODULES.filter((s) => s.targetRole === 'mentor').length,
    mentee: SUB_MODULES.filter((s) => s.targetRole === 'mentee').length,
  };

  const getRoleTheme = (role: UserRole) => {
    switch (role) {
      case 'institution':
        return {
          pill: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          btn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          border: 'border-indigo-300 ring-indigo-100',
          icon: 'account_balance',
        };
      case 'mentor':
        return {
          pill: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          border: 'border-emerald-300 ring-emerald-100',
          icon: 'workspace_premium',
        };
      case 'mentee':
      default:
        return {
          pill: 'bg-blue-100 text-blue-800 border-blue-200',
          btn: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-blue-300 ring-blue-100',
          icon: 'rocket_launch',
        };
    }
  };

  return (
    <div className="space-y-5 pb-8 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Mentoria Platform Sub-Service Hub
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              3대 페르소나별 특화 서브 서비스 모듈 센터
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              각 주제(기관/거버넌스, 전문가/멘토, 멘티/창업자)의 세부 실무 기능 모듈을 한눈에 탐색하고 즉시 진입할 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              전체 서브 서비스 가동중
            </span>
          </div>
        </div>

        {/* Persona Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              filterRole === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 서브 서비스 ({roleCounters.all})
          </button>
          <button
            onClick={() => setFilterRole('institution')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              filterRole === 'institution'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">account_balance</span>
            🏛️ 기관/거버넌스 ({roleCounters.institution})
          </button>
          <button
            onClick={() => setFilterRole('mentor')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              filterRole === 'mentor'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
            💼 전문가/멘토 ({roleCounters.mentor})
          </button>
          <button
            onClick={() => setFilterRole('mentee')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              filterRole === 'mentee'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">rocket_launch</span>
            🚀 멘티/창업자 ({roleCounters.mentee})
          </button>
        </div>
      </div>

      {/* Grid of Sub-Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredModules.map((m) => {
          const theme = getRoleTheme(m.targetRole);
          const isSelected = selectedModule.id === m.id;

          return (
            <div
              key={m.id}
              className={`bg-white rounded-2xl p-4 shadow-xs border transition-all flex flex-col justify-between ${
                isSelected
                  ? `border-blue-500 ring-2 ring-blue-100 shadow-sm`
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${theme.pill} flex items-center gap-1`}>
                    <span className="material-symbols-outlined text-[13px]">{theme.icon}</span>
                    {m.targetRoleName}
                  </span>
                  <span className="font-extrabold text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {m.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1 leading-snug">
                  {m.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {m.desc}
                </p>

                <div className="flex flex-wrap gap-1 mb-3.5">
                  {m.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    setPreviewModule(m);
                    setShowDetailModal(true);
                  }}
                  className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                  title="세부 기능 보기"
                >
                  <span className="material-symbols-outlined text-[16px]">info</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedModule(m);
                    onActivateModule(m.targetRole, m.targetTab, m.actionName);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${theme.btn}`}
                >
                  <span>{m.actionName}</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Detail Modal */}
      {showDetailModal && previewModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 sm:p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  {previewModule.badge}
                </span>
                <h4 className="font-bold text-base text-slate-900">{previewModule.name}</h4>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">소속 서브대시보드:</span>
                  <span className="font-bold text-blue-700">{previewModule.targetRoleName}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600">진입 탭: {previewModule.targetTab}</span>
                </div>
                <p className="text-slate-600 pt-1 leading-relaxed">{previewModule.desc}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">핵심 기능 구성:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  {previewModule.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  onActivateModule(previewModule.targetRole, previewModule.targetTab, previewModule.actionName);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                  getRoleTheme(previewModule.targetRole).btn
                }`}
              >
                <span>{previewModule.actionName}</span>
                <span className="material-symbols-outlined text-[16px]">launch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
