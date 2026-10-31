import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  BookOpen,
  Search,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Bookmark,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { HEALTH_ARTICLES, HEALTH_EDUCATION_CATEGORIES } from '../../demo-data/healthEducationData';

export function PatientHealthEducationPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(['art-hypertension-guide']);

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return HEALTH_ARTICLES.filter((art) => {
      const matchesCat =
        selectedCategory === 'All Topics' || art.category === selectedCategory;
      const matchesSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = HEALTH_ARTICLES.find((a) => a.featured) || HEALTH_ARTICLES[0];

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#263B59]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              Patient Health Education & Wellness Library
            </span>
            <span className="text-xs text-slate-400 dark:text-[#94A3B8]">•</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Doctor-Verified Clinical Content
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-[#F1F5F9] tracking-tight mt-1">
            Health Education & Clinical Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] mt-0.5">
            Empowering patients and families with actionable, evidence-based medical knowledge, chronic care protocols, and preventive health guidance.
          </p>
        </div>
      </div>

      {/* Featured Article Hero Card */}
      {featuredArticle && !searchQuery && selectedCategory === 'All Topics' && (
        <div
          onClick={() => setSelectedArticle(featuredArticle)}
          className="rounded-3xl overflow-hidden border border-slate-200 dark:border-[#263B59] bg-gradient-to-r from-blue-50/70 via-white to-indigo-50/60 dark:from-[#0D1729] dark:via-[#111E33] dark:to-[#172640] text-slate-900 dark:text-[#F1F5F9] shadow-md hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" /> Featured Clinical Guide
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-[#172640] text-slate-800 dark:text-white font-mono border border-slate-200 dark:border-[#263B59]">
                  {featuredArticle.readTime}
                </span>
                <span className="text-xs text-slate-400 dark:text-[#94A3B8]">·</span>
                <span className="text-xs text-slate-600 dark:text-[#CBD5E1]">{featuredArticle.category}</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed max-w-2xl">
                {featuredArticle.summary}
              </p>

              {/* Author badge */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.doctorAuthor.avatar}
                    alt={featuredArticle.doctorAuthor.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 dark:border-[#263B59]"
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white block">
                      {featuredArticle.doctorAuthor.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] font-medium">
                      {featuredArticle.doctorAuthor.specialty} · {featuredArticle.doctorAuthor.qualifications}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200 dark:border-white/10">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter Section */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 dark:text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search health guides, medicines, symptoms, or diets..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-[#94A3B8] dark:hover:text-white text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold">
            Showing {filteredArticles.length} Verified Articles
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {HEALTH_EDUCATION_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#172640] text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-[#1C2D4B] border border-slate-200 dark:border-[#263B59]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => {
          const isBookmarked = bookmarkedIds.includes(art.id);
          return (
            <Card
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col justify-between overflow-hidden hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group shadow-xs"
            >
              <div>
                {/* Article Cover */}
                <div className="relative aspect-16/9 bg-slate-100 dark:bg-[#0D1729] overflow-hidden">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-[#080F1E]/90 backdrop-blur-md text-blue-700 dark:text-[#22D3EE] border border-slate-200 dark:border-[#263B59]">
                      {art.category}
                    </span>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(art.id, e)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 dark:bg-[#0D1729]/90 backdrop-blur-md text-slate-700 dark:text-[#CBD5E1] hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-[#263B59]"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
                  </button>
                </div>

                {/* Article Body */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-[#94A3B8] font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                    <span>•</span>
                    <span>{art.publishedDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9] group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-[#CBD5E1] line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    {art.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-[#172640] text-slate-700 dark:text-[#CBD5E1] border border-slate-200 dark:border-[#263B59]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author & Read Footer */}
              <div className="p-4 pt-3 border-t border-slate-200 dark:border-[#263B59] flex items-center justify-between bg-slate-50/80 dark:bg-[#0D1729]/80">
                <div className="flex items-center gap-2.5">
                  <img
                    src={art.doctorAuthor.avatar}
                    alt={art.doctorAuthor.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-[#263B59]"
                  />
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-[#F1F5F9] block truncate max-w-[140px]">
                      {art.doctorAuthor.name}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] block truncate max-w-[140px]">
                      {art.doctorAuthor.specialty}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline flex items-center gap-0.5">
                  Read <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          size="lg"
        >
          <div className="space-y-6 text-xs max-h-[75vh] overflow-y-auto pr-1">
            {/* Meta header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#263B59] pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedArticle.doctorAuthor.avatar}
                  alt={selectedArticle.doctorAuthor.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-[#263B59]"
                />
                <div>
                  <span className="font-bold text-sm text-slate-900 dark:text-[#F1F5F9] block">
                    {selectedArticle.doctorAuthor.name}
                  </span>
                  <span className="text-slate-500 dark:text-[#94A3B8] text-[11px]">
                    {selectedArticle.doctorAuthor.specialty} · {selectedArticle.doctorAuthor.qualifications}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-[#172640] text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-[#263B59]">
                  {selectedArticle.category}
                </span>
                <span className="text-slate-500 dark:text-[#94A3B8] font-mono text-[11px]">
                  {selectedArticle.readTime}
                </span>
              </div>
            </div>

            {/* Subtitle / Teaser */}
            <p className="text-sm font-semibold text-slate-700 dark:text-[#CBD5E1] leading-relaxed italic border-l-4 border-blue-500 pl-3">
              "{selectedArticle.subtitle}"
            </p>

            {/* Key Takeaways Box */}
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-[#172640] border border-blue-200 dark:border-[#263B59] space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-[#22D3EE] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-[#22D3EE]" /> Key Clinical Takeaways for Patients
              </span>
              <ul className="space-y-1.5">
                {selectedArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-800 dark:text-white text-xs">
                    <span className="text-blue-600 dark:text-[#22D3EE] font-bold shrink-0 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            <div className="space-y-5 text-slate-700 dark:text-[#CBD5E1] leading-relaxed text-xs">
              {selectedArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">
                    {sec.heading}
                  </h4>
                  <p>{sec.content}</p>

                  {sec.bulletPoints && (
                    <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-[#CBD5E1]">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx}>{bp}</li>
                      ))}
                    </ul>
                  )}

                  {sec.calloutWarning && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px] flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{sec.calloutWarning}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Clinical FAQs */}
            {selectedArticle.clinicalFAQs && selectedArticle.clinicalFAQs.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-[#263B59]">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] block">
                  Frequently Asked Questions (Doctor Answers)
                </span>
                <div className="space-y-2">
                  {selectedArticle.clinicalFAQs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#172640] border border-slate-200 dark:border-[#263B59] space-y-1 text-xs"
                    >
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Q: {faq.question}
                      </span>
                      <p className="text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                        A: {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Reassurance */}
            <div className="pt-3 border-t border-slate-200 dark:border-[#263B59] flex items-center justify-between text-[11px] text-slate-500 dark:text-[#94A3B8]">
              <span>Reviewed by Medical Advisory Board · ClinicOS Healthcare</span>
              <Button variant="secondary" size="sm" onClick={() => setSelectedArticle(null)}>
                Close Reader
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
