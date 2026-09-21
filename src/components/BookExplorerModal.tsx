import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles,
  Layers,
  Calendar,
  Building,
  Filter
} from 'lucide-react';
import { Notebook, Book, ThemeConfig } from '../types';

interface BookExplorerModalProps {
  notebook: Notebook | null;
  currentTheme: ThemeConfig;
  onClose: () => void;
}

export const BookExplorerModal: React.FC<BookExplorerModalProps> = ({
  notebook,
  currentTheme,
  onClose
}) => {
  if (!notebook) return null;

  const [bookSearch, setBookSearch] = useState('');
  const [langFilter, setLangFilter] = useState<'all' | 'ar' | 'ur'>('all');
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  const books = notebook.books || [];

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      if (langFilter !== 'all' && b.lang && b.lang !== langFilter) {
        return false;
      }
      if (!bookSearch.trim()) return true;
      const q = bookSearch.toLowerCase();
      const titleMatch = b.title?.toLowerCase().includes(q);
      const authorMatch = b.author?.toLowerCase().includes(q);
      const pubMatch = b.publisher?.toLowerCase().includes(q);
      const tahqeeqMatch = b.tahqeeq?.toLowerCase().includes(q);
      return titleMatch || authorMatch || pubMatch || tahqeeqMatch;
    });
  }, [books, bookSearch, langFilter]);

  const handleCopyBook = (bookTitle: string) => {
    navigator.clipboard.writeText(bookTitle);
    setCopiedTitle(bookTitle);
    setTimeout(() => setCopiedTitle(null), 2000);
  };

  return (
    <div 
      id="book-explorer-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="book-explorer-modal"
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden"
        style={{ 
          backgroundColor: currentTheme.surface,
          borderColor: currentTheme.border 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="p-4 sm:p-5 border-b flex items-start justify-between gap-3 shrink-0"
          style={{ 
            backgroundColor: currentTheme.surfaceSecondary,
            borderColor: currentTheme.border 
          }}
        >
          <div className="flex items-start gap-3">
            <span 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border shadow-xs"
              style={{ 
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border 
              }}
            >
              {notebook.icon || '📚'}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span 
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: currentTheme.surface,
                    borderColor: currentTheme.border,
                    color: currentTheme.accent,
                    border: `1px solid ${currentTheme.border}`
                  }}
                >
                  {notebook.cat}
                </span>
                <span 
                  className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ 
                    backgroundColor: currentTheme.primary,
                    color: '#fff' 
                  }}
                >
                  {books.length} Total Volumes
                </span>
              </div>
              <h2 
                className="text-lg sm:text-xl font-bold font-arabic leading-snug"
                style={{ color: currentTheme.text }}
              >
                {notebook.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct NotebookLM link */}
            <a
              id="modal-open-notebooklm-btn"
              href={notebook.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 shadow-xs transition-opacity hover:opacity-90"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in NotebookLM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg border transition-colors cursor-pointer"
              style={{ 
                backgroundColor: currentTheme.surface,
                borderColor: currentTheme.border,
                color: currentTheme.textMuted 
              }}
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Language Filters Bar */}
        <div 
          className="p-3 sm:px-5 border-b flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0"
          style={{ 
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border 
          }}
        >
          {/* In-modal Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-2.5" style={{ color: currentTheme.textMuted }} />
            <input
              id="modal-search-books"
              type="text"
              placeholder="Filter books by title or author..."
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border outline-hidden"
              style={{ 
                backgroundColor: currentTheme.surfaceSecondary,
                borderColor: currentTheme.border,
                color: currentTheme.text 
              }}
            />
          </div>

          {/* Language filter buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
            <span className="text-xs mr-1 hidden sm:inline" style={{ color: currentTheme.textMuted }}>
              Language:
            </span>
            {(['all', 'ar', 'ur'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLangFilter(lang)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  langFilter === lang ? 'shadow-xs font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: langFilter === lang ? currentTheme.accent : currentTheme.surfaceSecondary,
                  color: langFilter === lang ? (currentTheme.mode === 'dark' ? '#000' : '#fff') : currentTheme.text
                }}
              >
                {lang === 'all' ? 'All Books' : lang === 'ar' ? 'Arabic (عربي)' : 'Urdu (اردو)'}
              </button>
            ))}
          </div>
        </div>

        {/* Books List Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: currentTheme.textMuted }} />
              <p className="text-sm font-medium" style={{ color: currentTheme.textMuted }}>
                No books matched your search criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div 
                className="text-xs font-medium mb-2 flex items-center justify-between"
                style={{ color: currentTheme.textMuted }}
              >
                <span>Showing {filteredBooks.length} of {books.length} volumes</span>
                <span>Click book to copy title</span>
              </div>

              {filteredBooks.map((book, idx) => (
                <div
                  key={idx}
                  id={`book-item-${idx}`}
                  className="p-3 sm:p-4 rounded-xl border transition-all duration-150 flex items-start justify-between gap-3 group hover:border-opacity-100"
                  style={{ 
                    backgroundColor: currentTheme.surfaceSecondary,
                    borderColor: currentTheme.border 
                  }}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span 
                      className="text-xs font-mono font-bold w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                      style={{ 
                        backgroundColor: currentTheme.surface,
                        color: currentTheme.textMuted,
                        border: `1px solid ${currentTheme.border}`
                      }}
                    >
                      {idx + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h4 
                        className="font-bold text-sm sm:text-base font-arabic leading-relaxed"
                        style={{ color: currentTheme.text }}
                        dir="auto"
                      >
                        {book.title}
                      </h4>

                      <div className="flex items-center gap-3 flex-wrap mt-1 text-xs" style={{ color: currentTheme.textMuted }}>
                        {book.author && (
                          <span className="flex items-center gap-1 font-arabic">
                            <span>المؤلف:</span>
                            <strong style={{ color: currentTheme.text }}>{book.author}</strong>
                          </span>
                        )}

                        {book.deathYear && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>وفات: {book.deathYear}</span>
                          </span>
                        )}

                        {book.publisher && (
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            <span>{book.publisher}</span>
                          </span>
                        )}

                        {book.volumes && (
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            <span>{book.volumes} {book.volumes === '1' ? 'Volume' : 'Volumes'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {book.lang && (
                      <span 
                        className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold"
                        style={{ 
                          backgroundColor: currentTheme.surface,
                          color: currentTheme.accent,
                          border: `1px solid ${currentTheme.border}`
                        }}
                      >
                        {book.lang}
                      </span>
                    )}

                    <button
                      id={`copy-book-btn-${idx}`}
                      onClick={() => handleCopyBook(book.title)}
                      className="p-1.5 rounded-lg border transition-colors cursor-pointer"
                      style={{ 
                        backgroundColor: currentTheme.surface,
                        borderColor: currentTheme.border,
                        color: currentTheme.textMuted 
                      }}
                      title="Copy Book Title"
                    >
                      {copiedTitle === book.title ? (
                        <Check className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div 
          className="p-3 sm:px-5 border-t flex items-center justify-between gap-3 shrink-0 text-xs"
          style={{ 
            backgroundColor: currentTheme.surfaceSecondary,
            borderColor: currentTheme.border,
            color: currentTheme.textMuted
          }}
        >
          <span>Tip: You can query all these books simultaneously inside Google NotebookLM.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-medium border transition-colors cursor-pointer"
            style={{ 
              backgroundColor: currentTheme.surface,
              borderColor: currentTheme.border,
              color: currentTheme.text 
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
