import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import { Notebook, ThemeConfig } from '../types';
import { analyzeLibraryAuthorsAndCenturies, CenturyData, AuthorData } from '../utils/libraryAnalytics';
import { History, Users, BarChart3, TrendingUp, Sparkles } from 'lucide-react';

interface LibraryDataVisualizerProps {
  notebooks: Notebook[];
  currentTheme: ThemeConfig;
}

export const LibraryDataVisualizer: React.FC<LibraryDataVisualizerProps> = ({
  notebooks,
  currentTheme
}) => {
  const [activeChart, setActiveChart] = useState<'centuries' | 'authors'>('centuries');

  const { centuries, topAuthors, totalIdentifiedWorks } = useMemo(() => {
    return analyzeLibraryAuthorsAndCenturies(notebooks);
  }, [notebooks]);

  // Max values for relative scaling
  const maxCenturyCount = Math.max(...centuries.map((c) => c.count), 1);
  const maxAuthorCount = Math.max(...topAuthors.map((a) => a.count), 1);

  // Custom Century Tooltip
  const CustomCenturyTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: CenturyData = payload[0].payload;
      return (
        <div 
          className="p-3 rounded-xl border shadow-xl text-xs max-w-xs z-50 backdrop-blur-md"
          style={{ 
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
            color: currentTheme.text
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1 border-b pb-1" style={{ borderColor: currentTheme.border }}>
            <span className="font-bold text-sm" style={{ color: currentTheme.accent }}>
              {data.century}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: currentTheme.surfaceSecondary }}>
              {data.rangeAH}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span style={{ color: currentTheme.textMuted }}>Era:</span>
              <span className="font-medium">{data.era}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: currentTheme.textMuted }}>Gregorian:</span>
              <span className="font-mono">{data.rangeCE}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: currentTheme.textMuted }}>Volumes Indexed:</span>
              <span className="font-bold text-sm" style={{ color: currentTheme.primary }}>
                {data.count.toLocaleString()} books
              </span>
            </div>
            <div className="pt-1 border-t text-[11px]" style={{ borderColor: currentTheme.border, color: currentTheme.textMuted }}>
              <span className="font-medium" style={{ color: currentTheme.text }}>Key Luminaries:</span> {data.prominentScholars}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Author Tooltip
  const CustomAuthorTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: AuthorData = payload[0].payload;
      return (
        <div 
          className="p-3 rounded-xl border shadow-xl text-xs max-w-xs z-50 backdrop-blur-md"
          style={{ 
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
            color: currentTheme.text
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1 border-b pb-1" style={{ borderColor: currentTheme.border }}>
            <div>
              <span className="font-bold text-sm block" style={{ color: currentTheme.text }}>
                {data.name}
              </span>
              <span className="font-arabic text-xs font-semibold" style={{ color: currentTheme.accent }}>
                {data.arabicName}
              </span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0" style={{ backgroundColor: currentTheme.surfaceSecondary }}>
              {data.deathYear}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span style={{ color: currentTheme.textMuted }}>Century:</span>
              <span className="font-medium">{data.century}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: currentTheme.textMuted }}>Primary Field:</span>
              <span className="font-medium">{data.discipline}</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t" style={{ borderColor: currentTheme.border }}>
              <span style={{ color: currentTheme.textMuted }}>Works & Commentaries:</span>
              <span className="font-bold text-sm" style={{ color: currentTheme.primary }}>
                {data.count} titles
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      id="library-data-visualizer"
      className="mt-6 rounded-2xl border p-4 sm:p-5 transition-all shadow-xs"
      style={{ 
        backgroundColor: currentTheme.surfaceSecondary,
        borderColor: currentTheme.border 
      }}
    >
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b" style={{ borderColor: currentTheme.border }}>
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" style={{ color: currentTheme.accent }} />
            <h3 className="font-bold text-sm sm:text-base tracking-tight" style={{ color: currentTheme.text }}>
              Collection Analytics & Chronological Distribution
            </h3>
            <span 
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold hidden md:inline"
              style={{ backgroundColor: currentTheme.surface, color: currentTheme.accent, border: `1px solid ${currentTheme.border}` }}
            >
              Recharts Engine
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: currentTheme.textMuted }}>
            Visualizing Islamic intellectual history across 14 centuries and leading master authors
          </p>
        </div>

        {/* Chart View Switcher */}
        <div 
          className="flex items-center p-1 rounded-lg border text-xs self-start sm:self-auto shrink-0"
          style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}
        >
          <button
            id="btn-chart-centuries"
            onClick={() => setActiveChart('centuries')}
            className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeChart === 'centuries' ? 'shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeChart === 'centuries' ? currentTheme.accent : 'transparent',
              color: activeChart === 'centuries' ? (currentTheme.mode === 'dark' ? '#000' : '#fff') : currentTheme.text
            }}
          >
            <History className="w-3.5 h-3.5" />
            <span>Centuries Timeline (1400+ Yrs)</span>
          </button>

          <button
            id="btn-chart-authors"
            onClick={() => setActiveChart('authors')}
            className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeChart === 'authors' ? 'shadow-xs' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeChart === 'authors' ? currentTheme.accent : 'transparent',
              color: activeChart === 'authors' ? (currentTheme.mode === 'dark' ? '#000' : '#fff') : currentTheme.text
            }}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Top Master Authors</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="w-full">
        {activeChart === 'centuries' ? (
          <div>
            {/* Quick Context Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}>
                <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Span of Intellectual Heritage</span>
                <strong className="font-bold" style={{ color: currentTheme.text }}>2nd AH &rarr; 15th AH (14 Centuries)</strong>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}>
                <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Peak Hadith Epoch</span>
                <strong className="font-bold" style={{ color: currentTheme.primary }}>3rd Century AH (Canonization)</strong>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}>
                <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Peak Encyclopedic Era</span>
                <strong className="font-bold" style={{ color: currentTheme.accent }}>8th Century AH (Ibn Taymiyyah/Kathir)</strong>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}>
                <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Contemporary Tahqeeq</span>
                <strong className="font-bold" style={{ color: currentTheme.text }}>14th–15th AH (Modern Editions)</strong>
              </div>
            </div>

            {/* Recharts Bar Chart for Centuries */}
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={centuries} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis 
                    dataKey="shortName" 
                    tick={{ fill: currentTheme.textMuted, fontSize: 11 }}
                    angle={-25}
                    textAnchor="end"
                    interval={0}
                    height={40}
                  />
                  <YAxis 
                    tick={{ fill: currentTheme.textMuted, fontSize: 11 }}
                  />
                  <Tooltip content={<CustomCenturyTooltip />} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {centuries.map((entry, index) => {
                      const isPeak = entry.shortName === '3rd AH' || entry.shortName === '8th AH';
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isPeak ? currentTheme.accent : currentTheme.primary} 
                          opacity={isPeak ? 1 : 0.85}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-[11px] text-center mt-2" style={{ color: currentTheme.textMuted }}>
              💡 Hover over any bar to view the historical era, Gregorian date correlation, volume counts, and prominent scholars of that century.
            </div>
          </div>
        ) : (
          <div>
            {/* Quick Context Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4 text-xs">
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}>
                <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Most Represented Hadith Master</span>
                <strong className="font-bold" style={{ color: currentTheme.primary }}>Imam Al-Bukhari (275+ titles/shuruh)</strong>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}>
                <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Most Represented Jurist/Theologian</span>
                <strong className="font-bold" style={{ color: currentTheme.accent }}>Ibn Taymiyyah (69+ compendiums)</strong>
              </div>
              <div className="p-2.5 rounded-lg border col-span-2 sm:col-span-1" style={{ backgroundColor: currentTheme.surface, borderColor: currentTheme.border }}>
                <span className="text-[10px] block" style={{ color: currentTheme.textMuted }}>Key Commentators & Exegetes</span>
                <strong className="font-bold" style={{ color: currentTheme.text }}>Ibn Kathir, Al-Tabari, Al-Nawawi, Ibn Hajar</strong>
              </div>
            </div>

            {/* Recharts Horizontal Bar Chart for Top Authors */}
            <div className="h-80 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  layout="vertical" 
                  data={topAuthors} 
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.15} />
                  <XAxis 
                    type="number" 
                    tick={{ fill: currentTheme.textMuted, fontSize: 11 }} 
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fill: currentTheme.text, fontSize: 11 }}
                    width={140}
                  />
                  <Tooltip content={<CustomAuthorTooltip />} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {topAuthors.map((entry, index) => {
                      const isTop = index < 3;
                      return (
                        <Cell 
                          key={`author-cell-${index}`} 
                          fill={isTop ? currentTheme.accent : currentTheme.primary} 
                          opacity={isTop ? 1 : 0.8}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[11px] text-center mt-2" style={{ color: currentTheme.textMuted }}>
              💡 Hover over any scholar to view their Arabic title, era, death year (وفات), and primary academic discipline.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
