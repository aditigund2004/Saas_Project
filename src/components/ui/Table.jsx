import React from 'react';
import { ChevronLeft, ChevronRight, Inbox, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Standard Modern Data Table Component System
 * Provides consistent alignment, typography, responsive horizontal scrolling,
 * sticky headers, hover effects, empty states, and pagination controls across the application.
 */

export function Table({
  children,
  className = '',
  containerClassName = '',
  stickyHeader = false,
  bordered = false
}) {
  return (
    <div
      className={`w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-2xs transition-colors ${containerClassName}`}
    >
      <table
        className={`w-full text-left border-collapse text-sm text-slate-800 dark:text-[#CBD5E1] ${
          stickyHeader ? 'relative' : ''
        } ${bordered ? 'border-separate border-spacing-0' : ''} ${className}`}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = '', sticky = false }) {
  return (
    <thead
      className={`bg-slate-50 dark:bg-[#0D1729] text-slate-600 dark:text-[#94A3B8] uppercase text-[11px] font-semibold tracking-wider border-b border-slate-200 dark:border-[#263B59] backdrop-blur-xs select-none ${
        sticky ? 'sticky top-0 z-10' : ''
      } ${className}`}
    >
      {children}
    </thead>
  );
}

export function TableBody({ children, className = '' }) {
  return (
    <tbody className={`divide-y divide-slate-200 dark:divide-[#263B59] text-xs sm:text-sm ${className}`}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = '', hover = true, onClick, selected = false }) {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors duration-100 ${
        hover ? 'hover:bg-slate-50 dark:hover:bg-[#172640]/70' : ''
      } ${selected ? 'bg-blue-50 dark:bg-[#172640]' : ''} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className = '',
  align = 'left',
  width,
  sortable = false,
  sortDirection = null, // 'asc' | 'desc' | null
  onSort
}) {
  const alignmentClass =
    align === 'right'
      ? 'text-right'
      : align === 'center'
      ? 'text-center'
      : 'text-left';

  const style = width ? { width } : undefined;

  return (
    <th
      style={style}
      className={`px-4 py-3.5 sm:px-5 font-semibold whitespace-nowrap text-[11px] text-slate-500 dark:text-slate-400 ${alignmentClass} ${
        sortable ? 'cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 select-none' : ''
      } ${className}`}
      onClick={sortable ? onSort : undefined}
    >
      <div
        className={`inline-flex items-center gap-1.5 ${
          align === 'right' ? 'justify-end w-full' : align === 'center' ? 'justify-center w-full' : ''
        }`}
      >
        <span className="truncate">{children}</span>
        {sortable && (
          <span className="text-slate-400 dark:text-slate-500 shrink-0">
            {sortDirection === 'asc' ? (
              <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            ) : sortDirection === 'desc' ? (
              <ArrowDown className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            ) : (
              <ArrowUpDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
            )}
          </span>
        )}
      </div>
    </th>
  );
}

export function TableCell({
  children,
  className = '',
  align = 'left',
  colSpan,
  rowSpan,
  variant = 'default', // 'default' | 'mono' | 'numeric' | 'muted' | 'action'
  truncate = false,
  title
}) {
  const alignmentClass =
    align === 'right'
      ? 'text-right justify-end'
      : align === 'center'
      ? 'text-center justify-center'
      : 'text-left';

  const variantStyles = {
    default: '',
    mono: 'font-mono text-xs font-semibold text-[#F1F5F9]',
    numeric: 'font-mono tabular-nums font-semibold text-[#F1F5F9]',
    muted: 'text-xs text-[#94A3B8]',
    action: 'whitespace-nowrap'
  };

  return (
    <td
      colSpan={colSpan}
      rowSpan={rowSpan}
      title={title}
      className={`px-4 py-3.5 sm:px-5 text-[#CBD5E1] align-middle ${alignmentClass} ${
        variantStyles[variant] || ''
      } ${truncate ? 'max-w-[200px] truncate' : ''} ${className}`}
    >
      {children}
    </td>
  );
}

export function TableActions({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-end gap-1.5 sm:gap-2 whitespace-nowrap ${className}`}>
      {children}
    </div>
  );
}

export function TableEmpty({
  colSpan = 6,
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'Try adjusting your search criteria or clear current filters.',
  action = null,
  className = ''
}) {
  return (
    <tr>
      <td colSpan={colSpan} className={`px-4 py-12 text-center ${className}`}>
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto text-slate-500 dark:text-[#94A3B8]">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-[#172640] flex items-center justify-center mb-2.5">
            <Icon className="w-5 h-5 text-slate-500 dark:text-[#94A3B8]" />
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-[#F1F5F9]">{title}</p>
          {description && <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-1">{description}</p>}
          {action && <div className="mt-3.5">{action}</div>}
        </div>
      </td>
    </tr>
  );
}

export function TablePagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  className = ''
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0D1729] text-xs text-slate-600 dark:text-[#94A3B8] ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span>Showing</span>
        <span className="font-semibold text-slate-900 dark:text-[#F1F5F9] tabular-nums">
          {startItem} - {endItem}
        </span>
        <span>of</span>
        <span className="font-semibold text-slate-900 dark:text-[#F1F5F9] tabular-nums">
          {totalItems}
        </span>
        <span>entries</span>
      </div>

      <div className="flex items-center gap-1 self-end sm:self-auto">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-3 py-1 text-slate-700 dark:text-[#CBD5E1] font-medium">
          Page {currentPage} of {Math.max(1, totalPages)}
        </span>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

