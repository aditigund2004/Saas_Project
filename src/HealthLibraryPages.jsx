import { useState, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Activity, AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, BookOpen,
  Calendar, Check, CheckCircle2, ChevronDown, ChevronRight, Clock, Eye,
  FileText, Filter, Heart, HeartPulse, HelpCircle, Info, Lock, MapPin,
  Pencil, Plus, RefreshCw, Search, Share2, Shield, ShieldAlert, ShieldCheck,
  Sparkles, Stethoscope, Tag, Trash2, User, UserCheck, Users, X,
} from 'lucide-react'
import { useStore } from './Store'
import { Badge, Modal, PageHeading, Panel, StatCard } from './components'
import { diseaseCategories } from './healthArticlesData'
import { MedicalDiagramViewer } from './MedicalDiagramViewer'
import { GuestAppointmentBookingModal } from './PublicPages'

// -------------------------------------------------------------
// 1. REUSABLE HEALTH BLOG CARD
// -------------------------------------------------------------
export function HealthBlogCard({ article, onSelect }) {
  return (
    <div className="card group flex flex-col justify-between overflow-hidden border-slate-200/90 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
      <div className="p-5 sm:p-6">
        {/* Category & Read Time */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
            <Tag size={11} /> {article.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <Clock size={12} /> {article.readTime || '6 min read'}
          </span>
        </div>

        {/* Disease Title */}
        <h3 className="brand-font mt-3.5 text-base font-bold text-slate-800 transition group-hover:text-blue-600 sm:text-lg line-clamp-2">
          {article.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-3">
          {article.shortDescription}
        </p>

        {/* Common Symptoms Pills */}
        {article.commonSymptoms && article.commonSymptoms.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
              <Activity size={11} className="text-rose-500" /> Common Symptoms
            </div>
            <div className="flex flex-wrap gap-1.5">
              {article.commonSymptoms.slice(0, 3).map((sym, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {sym}
                </span>
              ))}
              {article.commonSymptoms.length > 3 && (
                <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                  +{article.commonSymptoms.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Prevention Highlight */}
        {article.preventionHighlights && article.preventionHighlights[0] && (
          <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-emerald-50/70 p-2 text-[11px] text-emerald-800 border border-emerald-100/60">
            <ShieldCheck size={13} className="shrink-0 text-emerald-600 mt-0.5" />
            <span className="line-clamp-1">{article.preventionHighlights[0]}</span>
          </div>
        )}
      </div>

      {/* Footer Info & Read More Button */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
        <div className="text-[10px] text-slate-400">
          <span>Updated {article.updatedAt}</span>
        </div>
        <Link
          to={`/health-library/${article.slug}`}
          onClick={() => onSelect && onSelect(article)}
          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Read More <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// 2. HOME PAGE – HEALTH & DISEASE AWARENESS SECTION
// -------------------------------------------------------------
export function HealthLibrarySection({ onOpenBooking }) {
  const { data } = useStore()
  const articles = data?.articles || []
  const publishedArticles = articles.filter((a) => a.status === 'Published')

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = useMemo(() => {
    return ['All', ...(data?.diseaseCategories || diseaseCategories.slice(1))]
  }, [data?.diseaseCategories])

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category?.toLowerCase() === selectedCategory.toLowerCase()

      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchesCategory

      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.shortDescription.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        (article.commonSymptoms && article.commonSymptoms.some((s) => s.toLowerCase().includes(q)))

      return matchesCategory && matchesSearch
    })
  }, [publishedArticles, selectedCategory, searchQuery])

  return (
    <section id="health-library" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 border-b border-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
            <BookOpen size={13} /> Patient Health Education
          </div>
          <h2 className="brand-font mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
            Health Library – Understand Diseases, Protect Your Health
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
            Explore medically reviewed disease guides, early symptoms, evidence-based treatments, prevention methods,
            and when to seek clinical medical evaluation.
          </p>
        </div>

        <Link
          to="/health-library"
          className="btn btn-primary !px-5 !py-2.5 text-xs font-bold shrink-0 self-start md:self-auto flex items-center gap-1.5 shadow-sm"
        >
          View All Articles <ArrowRight size={14} />
        </Link>
      </div>

      {/* Category Pills & Search */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Scrollable Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          {categories.length > 8 && (
            <Link
              to="/health-library"
              className="text-xs font-semibold text-blue-600 hover:underline whitespace-nowrap px-2"
            >
              +{categories.length - 8} more categories
            </Link>
          )}
        </div>

        {/* Search bar */}
        <div className="relative min-w-[260px] sm:min-w-[300px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by disease or symptom (e.g. fever, diabetes)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="mt-8">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.slice(0, 6).map((article) => (
              <HealthBlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="card py-12 text-center">
            <BookOpen size={32} className="mx-auto text-slate-300" />
            <h3 className="mt-3 text-sm font-bold text-slate-700">No health guides found</h3>
            <p className="mt-1 text-xs text-slate-400">
              Try searching for a different disease name, symptom, or choose "All" categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-4 btn btn-secondary !py-1.5 !px-3 text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer Banner */}
      <div className="mt-12 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
            Professional Healthcare Network
          </span>
          <h3 className="brand-font mt-1 text-lg font-bold text-slate-800 sm:text-xl">
            Concerned about any health symptoms you're experiencing?
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-xl leading-relaxed">
            Educational information is powerful, but personalized diagnosis and clinical treatment plans require professional evaluation by a licensed doctor.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenBooking && onOpenBooking()}
            className="btn btn-primary !px-5 !py-2.5 text-xs font-bold shadow-sm flex items-center gap-2"
          >
            <Stethoscope size={15} /> Book Appointment
          </button>
          <Link to="/health-library" className="btn btn-secondary !px-4 !py-2.5 text-xs font-semibold">
            Browse All 12+ Guides
          </Link>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 3. COMPLETE HEALTH LIBRARY DIRECTORY PAGE (/health-library)
// -------------------------------------------------------------
export function HealthLibraryPage() {
  const { data } = useStore()
  const articles = data?.articles || []
  const publishedArticles = articles.filter((a) => a.status === 'Published')

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured') // 'featured' | 'recent' | 'popular'

  const [guestBookingOpen, setGuestBookingOpen] = useState(false)

  const categories = useMemo(() => {
    return ['All', ...(data?.diseaseCategories || diseaseCategories.slice(1))]
  }, [data?.diseaseCategories])

  const filteredArticles = useMemo(() => {
    let list = publishedArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category?.toLowerCase() === selectedCategory.toLowerCase()

      const q = searchQuery.toLowerCase().trim()
      if (!q) return matchesCategory

      const matchesSearch =
        article.title.toLowerCase().includes(q) ||
        article.shortDescription.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        (article.commonSymptoms && article.commonSymptoms.some((s) => s.toLowerCase().includes(q)))

      return matchesCategory && matchesSearch
    })

    if (sortBy === 'popular') {
      list = [...list].sort((a, b) => (b.views || 0) - (a.views || 0))
    } else if (sortBy === 'recent') {
      list = [...list].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    } else {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return list
  }, [publishedArticles, selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800">
      {/* Public Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Stethoscope size={19} />
            </span>
            <span className="brand-font text-lg font-extrabold text-slate-900">
              Clinic<span className="text-blue-600">OS</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/" className="text-slate-600 hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <button
              onClick={() => setGuestBookingOpen(true)}
              className="btn btn-primary !px-4 !py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Stethoscope size={14} /> Book Doctor Appointment
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-white to-blue-50/40 border-b border-blue-100/60 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
              <BookOpen size={13} /> Official Disease Awareness Library
            </div>
            <h1 className="brand-font mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Understand Common Diseases, Symptoms & Evidence-Based Care
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Peer-reviewed medical guides authored by licensed physicians. Search through 15 medical categories to
              understand symptoms, early detection, diagnosis, risk factors, and practical prevention steps.
            </p>

            {/* Live Search Bar */}
            <div className="mt-6 relative max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search diseases or symptoms (e.g. hypertension, migraine, wheezing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Quick Stats Highlights */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={15} className="text-emerald-500" /> 12+ Comprehensive Guides
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={15} className="text-emerald-500" /> 15 Disease Categories
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={15} className="text-emerald-500" /> 100% Medically Reviewed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Category Filters Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Filter size={13} /> Filter by Medical Category
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="popular">Most Read / Popular</option>
                <option value="recent">Recently Updated</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Current Active Filters */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong>{filteredArticles.length}</strong> medical {filteredArticles.length === 1 ? 'guide' : 'guides'}
            {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </div>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="text-blue-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <HealthBlogCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="card py-16 text-center">
            <BookOpen size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-700">No articles match your criteria</h3>
            <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
              We couldn't find any disease guides matching your current search or category filter. Try clearing your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-5 btn btn-primary !py-2 !px-4 text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Bottom Educational Medical Disclaimer */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-xs text-slate-500 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-2">
            <ShieldCheck size={18} className="text-blue-600" /> ClinicOS Health Information Standards & Medical Disclaimer
          </div>
          <p>
            All content published in the ClinicOS Health Library is created solely for general disease awareness,
            patient education, and health literacy. It is written and reviewed by licensed medical professionals and based
            on recognized clinical consensus guidelines. However, this material does not constitute personalized medical advice,
            individual clinical diagnosis, or a physician-patient relationship.
          </p>
          <p className="mt-2 font-medium text-slate-600">
            If you are experiencing acute, severe, or worsening symptoms (such as crushing chest pressure, severe shortness of breath,
            sudden weakness, or high fever), contact emergency services immediately or visit the nearest hospital emergency room.
          </p>
        </div>
      </main>

      {/* Guest Booking Modal if triggered */}
      {guestBookingOpen && (
        <GuestAppointmentBookingModal onClose={() => setGuestBookingOpen(false)} />
      )}
    </div>
  )
}

// -------------------------------------------------------------
// 4. DETAILED DISEASE BLOG PAGE (/health-library/:slug)
// -------------------------------------------------------------
export function HealthArticleDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data, incrementArticleViews } = useStore()
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)

  const articles = data?.articles || []
  const article = articles.find((a) => a.slug === slug || a.id === slug)

  // Increment view count on load
  useMemo(() => {
    if (slug) {
      incrementArticleViews && incrementArticleViews(slug)
    }
  }, [slug])

  // Related articles (same category or others, excluding current)
  const relatedArticles = useMemo(() => {
    if (!article) return []
    return articles
      .filter((a) => a.id !== article.id && a.status === 'Published')
      .sort((a, b) => {
        if (a.category === article.category) return -1
        if (b.category === article.category) return 1
        return 0
      })
      .slice(0, 3)
  }, [articles, article])

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <BookOpen size={48} className="text-slate-300 mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Disease Guide Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          The health guide you are looking for may have been moved, renamed, or is currently undergoing clinical revision.
        </p>
        <Link to="/health-library" className="mt-5 btn btn-primary !py-2 !px-4 text-xs font-bold">
          <ArrowLeft size={14} className="mr-1 inline" /> Return to Health Library
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link to="/health-library" className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-blue-600">
              <ArrowLeft size={15} /> Health Library
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-medium text-slate-400 hidden sm:inline truncate max-w-xs">
              {article.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="btn btn-primary !px-4 !py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Stethoscope size={14} /> Consult a Doctor
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link to="/health-library" className="hover:text-blue-600">Health Library</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-blue-600 font-semibold">{article.category}</span>
        </nav>

        {/* Article Header Card */}
        <div className="card p-6 sm:p-8 border-slate-200/90 shadow-sm bg-white">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Tag size={12} /> {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock size={13} className="text-slate-400" /> {article.readTime || '6 min read'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">
              Last Updated: {article.updatedAt}
            </span>
          </div>

          <h1 className="brand-font mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            {article.title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {article.shortDescription}
          </p>

          {/* Author & Reviewer Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 text-xs">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                {article.author?.initials || 'DR'}
              </div>
              <div>
                <div className="font-bold text-slate-800">{article.author?.name || 'Dr. Maya Patel'}</div>
                <div className="text-[11px] text-slate-400">{article.author?.role || 'Attending Physician'}</div>
              </div>
            </div>

            {/* Medically Reviewed By Badge */}
            {article.reviewedBy && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-emerald-900">
                <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[11px] font-bold">
                    Medically Reviewed by {article.reviewedBy.name}
                  </div>
                  <div className="text-[10px] text-emerald-700">
                    {article.reviewedBy.title} · {article.reviewedBy.date}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Symptoms & Prevention Highlights Summary Box */}
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Key Symptoms */}
          <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-800 mb-2">
              <Activity size={15} className="text-rose-600" /> Key Warning Symptoms
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              {(article.commonSymptoms || []).map((s, idx) => (
                <li key={idx} className="leading-snug">{s}</li>
              ))}
            </ul>
          </div>

          {/* Key Prevention Highlights */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-800 mb-2">
              <ShieldCheck size={15} className="text-emerald-600" /> Primary Prevention Highlights
            </div>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
              {(article.preventionHighlights || []).map((p, idx) => (
                <li key={idx} className="leading-snug">{p}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medical Diagram / Illustration */}
        <MedicalDiagramViewer diagramType={article.diagramType} title={article.title} />

        {/* Article Body - All 12 Structured Sections */}
        <div className="card p-6 sm:p-10 border-slate-200/90 shadow-sm bg-white space-y-10">
          {/* SECTION 1: OVERVIEW */}
          <section id="overview" className="scroll-mt-20">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Info size={15} /> Section 1 · Overview
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              Understanding {article.title.split(':')[0]}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {article.overview}
            </p>
          </section>

          {/* SECTION 2: WHAT CAUSES THE DISEASE */}
          <section id="causes" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Activity size={15} /> Section 2 · Etiology
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              What Causes the Disease?
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Primary physiological drivers, contributing factors, and pathogen mechanisms:
            </p>
            <div className="mt-4 space-y-2.5">
              {(article.causes || []).map((cause, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700 shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs leading-relaxed text-slate-700">{cause}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: SYMPTOMS */}
          <section id="symptoms" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertCircle size={15} /> Section 3 · Clinical Symptoms
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              Symptoms & Early Warning Signs
            </h2>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Early Symptoms */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock size={13} className="text-amber-500" /> Early Signs
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                  {(article.symptoms?.early || []).map((s, idx) => (
                    <li key={idx} className="leading-snug">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Common Symptoms */}
              <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-4">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity size={13} className="text-blue-600" /> Common Presentation
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
                  {(article.symptoms?.common || []).map((s, idx) => (
                    <li key={idx} className="leading-snug">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Warning Signs */}
              <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
                <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle size={13} className="text-rose-600" /> Red Flag Warnings
                </h4>
                <ul className="text-xs text-rose-950 space-y-2 list-disc pl-4 font-medium">
                  {(article.symptoms?.warningSigns || []).map((s, idx) => (
                    <li key={idx} className="leading-snug">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION 4: RISK FACTORS */}
          <section id="risk-factors" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldAlert size={15} /> Section 4 · Risk Factors
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              Who is Most at Risk?
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(article.riskFactors || []).map((risk, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-amber-100 bg-amber-50/30 p-3.5 text-xs text-slate-700">
                  <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{risk}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: TYPES AND STAGES */}
          {article.typesAndStages && article.typesAndStages.length > 0 && (
            <section id="types-stages" className="scroll-mt-20 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles size={15} /> Section 5 · Types & Clinical Stages
              </div>
              <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
                Disease Classifications & Severity Stages
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {article.typesAndStages.map((t, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-[10px] font-bold text-indigo-600">
                        {idx + 1}
                      </span>
                      {t.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{t.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 6: DIAGNOSIS */}
          <section id="diagnosis" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Stethoscope size={15} /> Section 6 · Clinical Diagnosis
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              Medical Tests & Examinations
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Healthcare providers utilize these diagnostic tests to confirm disease and assess severity:
            </p>
            <div className="mt-4 space-y-3">
              {(article.diagnosis || []).map((diag, idx) => (
                <div key={idx} className="rounded-xl border border-blue-100 bg-blue-50/20 p-4">
                  <div className="font-bold text-xs text-blue-900">{diag.testName}</div>
                  <div className="mt-1 text-xs text-slate-600 leading-relaxed">{diag.purpose}</div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7: TREATMENT OPTIONS */}
          <section id="treatment" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
              <HeartPulse size={15} /> Section 7 · Treatment Options
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              General Medical Treatments & Therapies
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(article.treatment || []).map((tx, idx) => (
                <div key={idx} className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-4">
                  <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" /> {tx.modality}
                  </div>
                  <div className="mt-1.5 text-xs text-slate-600 leading-relaxed">{tx.details}</div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: PREVENTION */}
          <section id="prevention" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck size={15} /> Section 8 · Prevention
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              Actionable Prevention & Risk Reduction
            </h2>
            <div className="mt-4 space-y-2.5">
              {(article.prevention || []).map((prev, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl bg-teal-50/40 p-3.5 border border-teal-100 text-xs text-slate-700">
                  <Check size={14} className="text-teal-600 mt-0.5 shrink-0" />
                  <span>{prev}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 9: DIET AND LIFESTYLE */}
          <section id="diet-lifestyle" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Heart size={15} /> Section 9 · Diet & Lifestyle Guidance
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              Nutrition, Physical Habits, and Daily Well-Being
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(article.dietAndLifestyle || []).map((d, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs text-slate-700">
                  <span className="font-semibold text-slate-800 block mb-1">Tip #{idx + 1}</span>
                  {d}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 10: WHEN TO CONSULT A DOCTOR */}
          <section id="when-to-consult" className="scroll-mt-20 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertTriangle size={15} /> Section 10 · When to Consult a Doctor
            </div>
            <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
              Seek Medical Attention Immediately If:
            </h2>
            <div className="mt-4 space-y-2.5">
              {(article.whenToConsult || []).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl bg-rose-50/50 p-3.5 border border-rose-100 text-xs text-rose-900 font-medium">
                  <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 11: FREQUENTLY ASKED QUESTIONS */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-20 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
                <HelpCircle size={15} /> Section 11 · Frequently Asked Questions
              </div>
              <h2 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">
                Common Patient Questions & Doctor Answers
              </h2>
              <div className="mt-4 space-y-3">
                {article.faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx
                  return (
                    <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden transition">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-600">
                            Q
                          </span>
                          {faq.question}
                        </span>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* SECTION 12: MEDICAL DISCLAIMER */}
          <section id="disclaimer" className="border-t border-slate-100 pt-8">
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold mb-1">
                <ShieldCheck size={16} className="text-amber-700" /> Section 12 · Medical Disclaimer
              </div>
              <p className="leading-relaxed">
                {article.disclaimer ||
                  'The information provided in this article is for educational and disease awareness purposes only. It does not replace clinical consultation, professional diagnosis, or personalized treatment by a licensed physician.'}
              </p>
            </div>
          </section>
        </div>

        {/* PROMINENT CALL TO ACTION (CTA): BOOK APPOINTMENT */}
        <div className="my-10 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-blue-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-100">
              Expert Clinical Consultation
            </span>
            <h3 className="brand-font mt-2 text-2xl font-bold tracking-tight">
              Need Personalized Medical Advice for {article.title.split(':')[0]}?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-blue-100 sm:text-sm">
              Schedule an in-person clinic visit or secure telehealth consultation with our licensed primary care physicians and specialists. No account creation required.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full sm:w-auto btn bg-white text-blue-700 hover:bg-blue-50 !py-3 !px-6 text-xs font-extrabold shadow-md flex items-center justify-center gap-2"
            >
              <Stethoscope size={16} /> Book Appointment
            </button>
            <Link
              to="/health-library"
              className="w-full sm:w-auto text-center text-xs font-bold text-blue-100 hover:text-white underline underline-offset-4"
            >
              Browse Other Guides
            </Link>
          </div>
        </div>

        {/* RELATED DISEASE ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <div className="my-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="brand-font text-lg font-bold text-slate-800">Related Disease Guides</h3>
                <p className="text-xs text-slate-400">Continue exploring health topics in {article.category} and related fields.</p>
              </div>
              <Link to="/health-library" className="text-xs font-bold text-blue-600 hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <HealthBlogCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Guest Booking Modal */}
      {bookingModalOpen && (
        <GuestAppointmentBookingModal onClose={() => setBookingModalOpen(false)} />
      )}
    </div>
  )
}

// -------------------------------------------------------------
// 5. CLINIC ADMIN & DOCTOR HEALTH BLOG MANAGEMENT PAGE (/clinic/blog)
// -------------------------------------------------------------
export function ClinicHealthBlogPage() {
  const {
    data,
    activeClinic,
    currentUser,
    addArticle,
    updateArticle,
    deleteArticle,
    archiveArticle,
    approveArticle,
    rejectArticle,
    addDiseaseCategory,
    notify,
  } = useStore()

  const [tab, setTab] = useState('all') // 'all' | 'published' | 'review' | 'drafts' | 'categories'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editArticle, setEditArticle] = useState(null)
  const [previewArticle, setPreviewArticle] = useState(null)
  const [rejectModalArticle, setRejectModalArticle] = useState(null)
  const [rejectFeedback, setRejectFeedback] = useState('')
  const [newCatInput, setNewCatInput] = useState('')

  // Role permissions
  const isClinicAdmin =
    currentUser?.role === 'clinic_admin' ||
    currentUser?.role === 'admin' ||
    currentUser?.title?.toLowerCase().includes('admin') ||
    !currentUser?.role

  const isDoctorOnly = currentUser?.role === 'doctor' && !isClinicAdmin

  const articles = data?.articles || []
  const categories = data?.diseaseCategories || diseaseCategories.slice(1)

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Tab filter
      if (tab === 'published' && art.status !== 'Published') return false
      if (tab === 'review' && art.status !== 'Under Review') return false
      if (tab === 'drafts' && art.status !== 'Draft' && art.status !== 'Rejected') return false

      // Category filter
      if (selectedCategory !== 'All' && art.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false
      }

      // Search query
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      return (
        art.title.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        (art.author?.name && art.author.name.toLowerCase().includes(q))
      )
    })
  }, [articles, tab, selectedCategory, searchQuery])

  // Count badges
  const publishedCount = articles.filter((a) => a.status === 'Published').length
  const underReviewCount = articles.filter((a) => a.status === 'Under Review').length
  const draftCount = articles.filter((a) => a.status === 'Draft' || a.status === 'Rejected').length

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const title = form.get('title')
    const category = form.get('category')
    const shortDescription = form.get('shortDescription')
    const readTime = form.get('readTime') || '6 min read'
    const overview = form.get('overview')
    const commonSymptoms = form.get('commonSymptoms')
    const causes = form.get('causes')
    const prevention = form.get('prevention')
    const status = isDoctorOnly ? 'Under Review' : form.get('status') || 'Published'

    addArticle({
      title,
      category,
      shortDescription,
      readTime,
      overview,
      commonSymptoms,
      causes,
      prevention,
      status,
      author: {
        name: currentUser?.name || 'Dr. Maya Patel',
        role: currentUser?.title || 'Attending Physician',
        initials: (currentUser?.name || 'DP').split(' ').map((n) => n[0]).join('').slice(0, 2),
        clinicId: activeClinic.id,
      },
    })

    setCreateModalOpen(false)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!editArticle) return
    const form = new FormData(e.currentTarget)

    updateArticle(editArticle.id, {
      title: form.get('title'),
      category: form.get('category'),
      shortDescription: form.get('shortDescription'),
      readTime: form.get('readTime'),
      overview: form.get('overview'),
      status: isDoctorOnly && editArticle.status === 'Rejected' ? 'Under Review' : form.get('status'),
    })

    setEditArticle(null)
  }

  const handleAddCategorySubmit = (e) => {
    e.preventDefault()
    if (!newCatInput.trim()) return
    addDiseaseCategory(newCatInput.trim())
    setNewCatInput('')
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Patient Education & Content Strategy"
        title="Health Blog Management"
        description="Create, review, publish, and maintain educational disease guides across the ClinicOS platform."
        action={
          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn btn-primary !py-2.5 !px-4 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} /> {isDoctorOnly ? 'Submit Health Article' : 'New Disease Guide'}
          </button>
        }
      />

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        <StatCard label="Total Guides" value={articles.length} icon={BookOpen} tone="blue" />
        <StatCard label="Live Published" value={publishedCount} icon={CheckCircle2} tone="green" />
        <StatCard label="Under Review" value={underReviewCount} icon={Clock} tone="amber" />
        <StatCard label="Drafts & Revisions" value={draftCount} icon={FileText} tone="gray" />
      </div>

      {/* Role explanation banner */}
      <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0">
            <Stethoscope size={18} />
          </div>
          <div>
            <span className="font-bold text-slate-800">
              {isClinicAdmin ? 'Clinic Administrator Editorial Console' : 'Doctor Educational Contributor Workspace'}
            </span>
            <p className="text-slate-500 mt-0.5">
              {isClinicAdmin
                ? 'You have administrative permissions to create, edit, approve, reject, publish, or archive public disease guides.'
                : 'As an attending physician, you can author clinical educational guides and submit them for Clinic Admin review.'}
            </p>
          </div>
        </div>
        <Link
          to="/health-library"
          target="_blank"
          className="btn btn-secondary !py-1.5 !px-3 text-xs font-semibold shrink-0 hidden sm:flex items-center gap-1"
        >
          <Eye size={13} /> View Live Health Library
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Articles', count: articles.length },
            { id: 'published', label: 'Published (Live)', count: publishedCount },
            { id: 'review', label: 'Under Review', count: underReviewCount },
            { id: 'drafts', label: 'Drafts / Rejected', count: draftCount },
            { id: 'categories', label: 'Manage Categories', count: categories.length },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                tab === item.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${tab === item.id ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters if not in category tab */}
        {tab !== 'categories' && (
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-700 outline-none w-48 sm:w-60"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tab 1-4: Articles List */}
      {tab !== 'categories' && (
        <Panel title={`Health Library Articles (${filteredArticles.length})`} subtitle="Manage patient awareness articles">
          {filteredArticles.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredArticles.map((art) => (
                <div key={art.id} className="py-4.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">{art.title}</span>
                      <Badge
                        tone={
                          art.status === 'Published'
                            ? 'green'
                            : art.status === 'Under Review'
                            ? 'amber'
                            : art.status === 'Rejected'
                            ? 'rose'
                            : 'gray'
                        }
                      >
                        {art.status}
                      </Badge>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500 line-clamp-1">{art.shortDescription}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                      <span>Author: <strong className="text-slate-600">{art.author?.name || 'Dr. Maya Patel'}</strong></span>
                      {art.reviewedBy && (
                        <span>Reviewed: <strong className="text-emerald-700">{art.reviewedBy.name}</strong></span>
                      )}
                      <span>Updated: {art.updatedAt}</span>
                      <span>Views: {art.views || 0}</span>
                    </div>

                    {/* Admin Feedback note if rejected */}
                    {art.status === 'Rejected' && art.adminFeedback && (
                      <div className="mt-2 text-xs text-rose-700 bg-rose-50 border border-rose-100 p-2 rounded-lg">
                        <strong>Editorial Feedback:</strong> {art.adminFeedback}
                      </div>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setPreviewArticle(art)}
                      className="btn btn-secondary !py-1.5 !px-2.5 text-xs flex items-center gap-1"
                      title="Preview Guide"
                    >
                      <Eye size={13} /> Preview
                    </button>

                    {/* Admin Approval / Rejection buttons for Under Review */}
                    {isClinicAdmin && art.status === 'Under Review' && (
                      <>
                        <button
                          onClick={() => approveArticle(art.id)}
                          className="btn btn-primary !py-1.5 !px-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1"
                        >
                          <Check size={13} /> Approve
                        </button>
                        <button
                          onClick={() => {
                            setRejectModalArticle(art)
                            setRejectFeedback('')
                          }}
                          className="btn btn-secondary !py-1.5 !px-2.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-1"
                        >
                          <X size={13} /> Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => setEditArticle(art)}
                      className="btn btn-secondary !py-1.5 !px-2.5 text-xs flex items-center gap-1"
                    >
                      <Pencil size={13} /> Edit
                    </button>

                    {isClinicAdmin && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete article "${art.title}"?`)) {
                            deleteArticle(art.id)
                          }
                        }}
                        className="btn btn-secondary !py-1.5 !px-2.5 text-xs text-rose-500 hover:bg-rose-50"
                        title="Delete Article"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No articles found matching the selected status or filters.
            </div>
          )}
        </Panel>
      )}

      {/* Tab 5: Categories Management */}
      {tab === 'categories' && (
        <Panel title="Disease Categories" subtitle="Manage taxonomies for the public health library">
          <form onSubmit={handleAddCategorySubmit} className="mb-6 flex gap-3 max-w-md">
            <input
              type="text"
              placeholder="Enter new category name..."
              value={newCatInput}
              onChange={(e) => setNewCatInput(e.target.value)}
              className="form-input !text-xs flex-1"
              required
            />
            <button type="submit" className="btn btn-primary !py-2 !px-4 text-xs font-bold shrink-0">
              Add Category
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {categories.map((cat, idx) => {
              const count = articles.filter((a) => a.category?.toLowerCase() === cat.toLowerCase()).length
              return (
                <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">
                      <Tag size={13} />
                    </span>
                    <span className="font-bold text-xs text-slate-800">{cat}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                    {count} guides
                  </span>
                </div>
              )
            })}
          </div>
        </Panel>
      )}

      {/* CREATE ARTICLE MODAL */}
      {createModalOpen && (
        <Modal title={isDoctorOnly ? 'Submit Health Guide for Review' : 'Create New Disease Guide'} onClose={() => setCreateModalOpen(false)} wide>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Disease Name / Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Celiac Disease: Symptoms, Diagnosis & Diet"
                  className="form-input !text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Category *</label>
                <select name="category" className="form-input !text-xs" required>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Short Description *</label>
              <textarea
                name="shortDescription"
                rows={2}
                placeholder="A concise 2-3 sentence overview for the card summary..."
                className="form-input !text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Estimated Reading Time</label>
                <input
                  type="text"
                  name="readTime"
                  defaultValue="6 min read"
                  className="form-input !text-xs"
                />
              </div>

              {!isDoctorOnly && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Publication Status</label>
                  <select name="status" className="form-input !text-xs">
                    <option value="Published">Publish Immediately</option>
                    <option value="Draft">Save as Draft</option>
                    <option value="Under Review">Submit for Review</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Overview / Introduction *</label>
              <textarea
                name="overview"
                rows={3}
                placeholder="Comprehensive clinical explanation of the disease, pathophysiology, and prevalence..."
                className="form-input !text-xs"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Common Symptoms (comma separated)
              </label>
              <input
                type="text"
                name="commonSymptoms"
                placeholder="e.g. Abdominal pain, Bloating, Chronic fatigue, Weight loss"
                className="form-input !text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Causes & Contributing Factors (one per line)
              </label>
              <textarea
                name="causes"
                rows={3}
                placeholder="Autoimmune reaction to gluten ingestion&#10;HLA-DQ2 and HLA-DQ8 genetic variants"
                className="form-input !text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Prevention & Lifestyle Measures (one per line)
              </label>
              <textarea
                name="prevention"
                rows={2}
                placeholder="Strict lifelong gluten-free diet&#10;Inspect food labels for hidden wheat"
                className="form-input !text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="btn btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary !py-2 !px-4 text-xs font-bold">
                {isDoctorOnly ? 'Submit for Review' : 'Create & Save Article'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* EDIT ARTICLE MODAL */}
      {editArticle && (
        <Modal title={`Edit: ${editArticle.title}`} onClose={() => setEditArticle(null)} wide>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editArticle.title}
                  className="form-input !text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Category</label>
                <select name="category" defaultValue={editArticle.category} className="form-input !text-xs">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Short Description</label>
              <textarea
                name="shortDescription"
                rows={2}
                defaultValue={editArticle.shortDescription}
                className="form-input !text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  defaultValue={editArticle.readTime}
                  className="form-input !text-xs"
                />
              </div>

              {isClinicAdmin && (
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Status</label>
                  <select name="status" defaultValue={editArticle.status} className="form-input !text-xs">
                    <option value="Published">Published</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">Overview</label>
              <textarea
                name="overview"
                rows={4}
                defaultValue={editArticle.overview}
                className="form-input !text-xs"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditArticle(null)}
                className="btn btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary !py-2 !px-4 text-xs font-bold">
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ARTICLE PREVIEW MODAL */}
      {previewArticle && (
        <Modal title={`Preview: ${previewArticle.title}`} onClose={() => setPreviewArticle(null)} wide>
          <div className="max-h-[75vh] overflow-y-auto pr-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                {previewArticle.category}
              </span>
              <span className="text-xs text-slate-400">· {previewArticle.readTime}</span>
              <span className="text-xs text-slate-400">· Status: {previewArticle.status}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900">{previewArticle.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{previewArticle.shortDescription}</p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <strong>Overview:</strong>
              <p className="mt-1 text-slate-600">{previewArticle.overview}</p>
            </div>

            {previewArticle.commonSymptoms && (
              <div className="p-3 rounded-lg bg-rose-50 text-xs text-rose-900">
                <strong>Symptoms:</strong> {Array.isArray(previewArticle.commonSymptoms) ? previewArticle.commonSymptoms.join(', ') : previewArticle.commonSymptoms}
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setPreviewArticle(null)}
                className="btn btn-primary !py-1.5 !px-4 text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* REJECT WITH FEEDBACK MODAL */}
      {rejectModalArticle && (
        <Modal title="Reject Article with Feedback" onClose={() => setRejectModalArticle(null)}>
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Provide constructive feedback to the author ({rejectModalArticle.author?.name}) explaining what revisions are needed before publication.
            </p>
            <textarea
              rows={4}
              placeholder="e.g. Please expand the diagnostic criteria and add red flag warning signs..."
              value={rejectFeedback}
              onChange={(e) => setRejectFeedback(e.target.value)}
              className="form-input !text-xs w-full"
              required
            />
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setRejectModalArticle(null)}
                className="btn btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  rejectArticle(rejectModalArticle.id, rejectFeedback)
                  setRejectModalArticle(null)
                }}
                className="btn btn-primary !py-2 !px-4 text-xs font-bold bg-rose-600 hover:bg-rose-700"
              >
                Confirm Rejection & Send Feedback
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

