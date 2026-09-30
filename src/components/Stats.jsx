import { dueState } from '../utils';

export default function Stats({ todos }) {
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  const overdue = todos.filter((t) => dueState(t) === 'overdue').length;
  const active = total - done - overdue;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const segments = [
    { label: 'เสร็จแล้ว', value: done, color: '#10b981' },
    { label: 'ยังไม่เสร็จ', value: active, color: '#6366f1' },
    { label: 'เกินกำหนด', value: overdue, color: '#f43f5e' },
  ];
  let offset = 25; // start at 12 o'clock

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md dark:border-white/10 dark:bg-[#1a1d24]">
      <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">สถิติ</h2>
      <div className="flex items-center gap-4 md:flex-col md:items-start">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full" role="img" aria-label={`เสร็จแล้ว ${pct}%`}>
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-100 dark:text-white/10" />
            {total > 0 &&
              segments.map((s) => {
                const len = (s.value / total) * 100;
                const el = s.value > 0 && (
                  <circle key={s.label} cx="18" cy="18" r="15.9155" fill="none" stroke={s.color} strokeWidth="4"
                    strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={offset} />
                );
                offset -= len;
                return el;
              })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900 dark:text-gray-100">{pct}%</div>
        </div>
        <div className="min-w-0 flex-1 text-sm">
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            ทั้งหมด <strong className="text-gray-900 dark:text-gray-100">{total}</strong> งาน · เสร็จแล้ว <strong className="text-gray-900 dark:text-gray-100">{pct}%</strong>
          </p>
          <ul className="space-y-1">
            {segments.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="flex-1">{s.label}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
