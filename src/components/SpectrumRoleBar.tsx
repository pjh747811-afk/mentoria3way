import React from 'react';

export type UserRole = 'institution' | 'mentor' | 'mentee';

interface SpectrumRoleBarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const SpectrumRoleBar: React.FC<SpectrumRoleBarProps> = ({
  currentRole,
  onRoleChange,
}) => {
  const roles = [
    {
      id: 'institution' as UserRole,
      title: '기관 / 거버넌스',
      sub: '중기부·창진원·지자체',
      icon: 'account_balance',
      color: 'indigo',
      badge: '예산 집행 & 성과 감사',
      accentGradient: 'from-indigo-600 via-purple-600 to-indigo-800',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-200',
      activeBg: 'bg-indigo-50/90 text-indigo-950',
      iconBg: 'bg-indigo-600 text-white',
      badgeBg: 'bg-indigo-100 text-indigo-700',
      description: '15억 바우처 예산 총괄, 128개 스타트업 육성 추적, 정산 승인 및 감사 리포트',
    },
    {
      id: 'mentor' as UserRole,
      title: '전문가 / 멘토',
      sub: '현직 리더·심사역·전문가',
      icon: 'workspace_premium',
      color: 'emerald',
      badge: '세션 코칭 & 정산 센터',
      accentGradient: 'from-emerald-600 via-teal-600 to-emerald-800',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-200',
      activeBg: 'bg-emerald-50/90 text-emerald-950',
      iconBg: 'bg-emerald-600 text-white',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      description: '멘토링 요청 큐 수락, 이번 달 정산액 425만원, 코칭 리포트 및 슬롯 관리',
    },
    {
      id: 'mentee' as UserRole,
      title: '멘티 / 창업자',
      sub: '초기창업가·주니어 인재',
      icon: 'rocket_launch',
      color: 'blue',
      badge: '성장 로드맵 & 바우처',
      accentGradient: 'from-blue-600 via-sky-600 to-blue-800',
      activeBorder: 'border-blue-500 ring-2 ring-blue-200',
      activeBg: 'bg-blue-50/90 text-blue-950',
      iconBg: 'bg-blue-600 text-white',
      badgeBg: 'bg-blue-100 text-blue-800',
      description: '4단계 창업 로드맵, 바우처 12,500P 사용, 현직자 1:1 매칭 및 지원사업 신청',
    },
  ];

  const activeRoleData = roles.find((r) => r.id === currentRole)!;

  return (
    <div className="mb-6 bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/90">
      {/* Top Banner introducing the 3-Persona Spectrum */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-blue-500 animate-pulse"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Mentoria Multi-Persona Spectrum
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
              3대 핵심 대시보드
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            사용자 역할 스펙트럼 전환
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            플랫폼을 이용하는 3대 주체별 특화된 데이터와 관리 도구로 즉시 전환됩니다.
          </p>
        </div>

        {/* Current Active Indicator Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-slate-400 font-medium">현재 모드:</span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xs ${activeRoleData.badgeBg}`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {activeRoleData.icon}
            </span>
            {activeRoleData.title}
          </span>
        </div>
      </div>

      {/* Spectrum Card Selector Tabs (Responsive Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {roles.map((r) => {
          const isSelected = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => onRoleChange(r.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                isSelected
                  ? `${r.activeBorder} ${r.activeBg} shadow-sm`
                  : 'border-slate-200/80 bg-[#f7f9fb] hover:bg-slate-100/90 hover:border-slate-300'
              }`}
            >
              {/* Subtle top indicator bar */}
              {isSelected && (
                <div
                  className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${r.accentGradient}`}
                />
              )}

              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-2xs ${
                      isSelected ? r.iconBg : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{r.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      {r.title}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">{r.sub}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isSelected ? r.badgeBg : 'bg-slate-200/60 text-slate-600'
                  }`}
                >
                  {r.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {r.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span
                  className={`font-semibold ${
                    isSelected ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                >
                  {isSelected ? '● 활성화 중' : '대시보드 보기'}
                </span>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5 ${
                    isSelected ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  arrow_forward
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
