import React, { useState } from 'react';
import { BookOpen, Layers, Globe2, Sparkles, Compass, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { Notebook, ThemeConfig } from '../types';
import { LibraryDataVisualizer } from './LibraryDataVisualizer';

interface StatsBannerProps {
  currentTheme: ThemeConfig;
  notebooks: Notebook[];
  totalNotebooks: number;
  totalBooks: number;
  totalCategories: number;
  arabicBooksCount: number;
  urduBooksCount: number;
  onSelectLanguage: (lang: 'all' | 'ar' | 'ur') => void;
  onOpenMasterBooks: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  currentTheme,
  notebooks,
  totalNotebooks,
  totalBooks,
  totalCategories,
  arabicBooksCount,
  urduBooksCount,
  onSelectLanguage,
  onOpenMasterBooks
}) => {
  const [showVisualizer, setShowVisualizer] = useState<boolean>(true);

  return (
    <div 
      id="stats-banner-container"
      className="py-6 px-4 sm:px-6 lg:px-8 border-b"
      style={{ 
        backgroundColor: currentTheme.surface,
        borderColor: currentTheme.border
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🕌</span>
              <h2 
                className="text-xl sm:text-2xl font-bold tracking-tight font-sans-custom"
                style={{ color: currentTheme.text }}
              >
                Al-Turath NotebookLMs Digital Hub
              </h2>
            </div>
            <p 
              className="text-xs sm:text-sm max-w-2xl font-normal leading-relaxed"
              style={{ color: currentTheme.textMuted }}
            >
              Curated Islamic heritage repository connecting classical & contemporary Islamic sciences with Google NotebookLM AI research workspaces.
            </p>
          </div>

          {/* Quick Action Pill */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="toggle-analytics-btn"
              onClick={() => setShowVisualizer(!showVisualizer)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border shadow-xs hover:opacity-90"
              style={{ 
                backgroundColor: showVisualizer ? currentTheme.accent : currentTheme.surfaceSecondary,
                borderColor: currentTheme.accent,
                color: showVisualizer ? (currentTheme.mode === 'dark' ? '#000' : '#fff') : currentTheme.accent
              }}
              title="Toggle Author & Century Analytics Charts"
            >
              <BarChart2 className="w-4 h-4" />
              <span>{showVisualizer ? 'Hide Visual Charts' : 'Show Authors & Centuries Charts'}</span>
              {showVisualizer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              id="browse-all-books-banner-btn"
              onClick={onOpenMasterBooks}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border shadow-xs hover:opacity-90"
              style={{ 
                backgroundColor: currentTheme.surfaceSecondary,
                borderColor: currentTheme.border,
                color: currentTheme.text
              }}
            >
              <BookOpen className="w-4 h-4" style={{ color: currentTheme.primary }} />
              <span>Browse All {totalBooks.toLocaleString()} Books</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Notebooks Count */}
          <div 
            id="stat-card-notebooks"
            className="p-3.5 rounded-xl border transition-all duration-150"
            style={{ 
              backgroundColor: currentTheme.surfaceSecondary,
              borderColor: currentTheme.border 
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: currentTheme.textMuted }}>
                NotebookLM Hubs
              </span>
              <Sparkles className="w-4 h-4" style={{ color: currentTheme.accent }} />
            </div>
            <div className="text-2xl font-extrabold" style={{ color: currentTheme.text }}>
              {totalNotebooks}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: currentTheme.textMuted }}>
              Interactive AI Notebooks
            </div>
          </div>

          {/* Total Books */}
          <div 
            id="stat-card-books"
            onClick={onOpenMasterBooks}
            className="p-3.5 rounded-xl border transition-all duration-150 cursor-pointer hover:border-opacity-100"
            style={{ 
              backgroundColor: currentTheme.surfaceSecondary,
              borderColor: currentTheme.border 
            }}
            title="Click to browse full library catalog"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: currentTheme.textMuted }}>
                Indexed Sources & Books
              </span>
              <BookOpen className="w-4 h-4" style={{ color: currentTheme.primary }} />
            </div>
            <div className="text-2xl font-extrabold" style={{ color: currentTheme.text }}>
              {totalBooks.toLocaleString()}
            </div>
            <div className="text-[11px] mt-0.5 flex items-center gap-1" style={{ color: currentTheme.accent }}>
              <span>Click to view full catalog &rarr;</span>
            </div>
          </div>

          {/* Categories */}
          <div 
            id="stat-card-categories"
            className="p-3.5 rounded-xl border transition-all duration-150"
            style={{ 
              backgroundColor: currentTheme.surfaceSecondary,
              borderColor: currentTheme.border 
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: currentTheme.textMuted }}>
                Islamic Disciplines
              </span>
              <Layers className="w-4 h-4" style={{ color: currentTheme.accent }} />
            </div>
            <div className="text-2xl font-extrabold" style={{ color: currentTheme.text }}>
              {totalCategories}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: currentTheme.textMuted }}>
              Tafsir, Hadith, Fiqh, Nahw & more
            </div>
          </div>

          {/* Languages Distribution */}
          <div 
            id="stat-card-languages"
            className="p-3.5 rounded-xl border transition-all duration-150"
            style={{ 
              backgroundColor: currentTheme.surfaceSecondary,
              borderColor: currentTheme.border 
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: currentTheme.textMuted }}>
                Languages & Scripts
              </span>
              <Globe2 className="w-4 h-4" style={{ color: currentTheme.primary }} />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <button 
                onClick={() => onSelectLanguage('ar')}
                className="text-xs px-2 py-1 rounded font-medium border transition-opacity hover:opacity-80 cursor-pointer"
                style={{ 
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.border,
                  color: currentTheme.text
                }}
                title="Filter Arabic Sources"
              >
                عربي: {arabicBooksCount.toLocaleString()}
              </button>
              <button 
                onClick={() => onSelectLanguage('ur')}
                className="text-xs px-2 py-1 rounded font-medium border transition-opacity hover:opacity-80 cursor-pointer"
                style={{ 
                  backgroundColor: currentTheme.surface,
                  borderColor: currentTheme.border,
                  color: currentTheme.text
                }}
                title="Filter Urdu Sources"
              >
                اردو: {urduBooksCount.toLocaleString()}
              </button>
            </div>
          </div>

        </div>

        {/* Data Visualization Section using Recharts */}
        {showVisualizer && (
          <LibraryDataVisualizer
            notebooks={notebooks}
            currentTheme={currentTheme}
          />
        )}

      </div>
    </div>
  );
};

