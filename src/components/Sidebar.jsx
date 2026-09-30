import { CATEGORIES } from '../constants';

export default function Sidebar({ todos, category, onSelect }) {
  const count = (k) => (k === 'all' ? todos.length : todos.filter((t) => t.category === k).length);
  const items = [['all', { label: 'ทุกหมวดหมู่', dot: 'bg-gray-400' }], ...Object.entries(CATEGORIES)];

  return (
    <nav aria-label="หมวดหมู่" className="rounded-2xl border border-gray-100 bg-white p-3 shadow-md dark:border-white/10 dark:bg-[#1a1d24]">
      <h2 className="mb-2 px-1 text-sm font-semibold text-gray-900 dark:text-gray-100">หมวดหมู่</h2>
      <div className="flex flex-wrap gap-1.5 md:flex-col md:gap-1">
        {items.map(([k, c]) => (
          <button key={k} onClick={() => onSelect(k)} aria-pressed={category === k}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors md:w-full ${
              category === k
                ? 'bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
            }`}>
            <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
            <span className="md:flex-1 md:text-left">{c.label}</span>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300">{count(k)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
