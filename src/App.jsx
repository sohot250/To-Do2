import { useState } from 'react';
import { ListChecks, Plus } from 'lucide-react';
import TodoItem from './components/TodoItem';
import { FILTERS, NEXT_PRIORITY, PRIORITIES } from './constants';

let nextId = 4;

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high' },
    { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium' },
    { id: 3, text: 'อ่านหนังสือ 20 หน้า', done: true, priority: 'low' },
  ]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((s) => [{ id: nextId++, text: t, done: false, priority }, ...s]);
    setText('');
  };
  const toggle = (id) =>
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const edit = (id, v) =>
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, text: v } : t)));
  const cycle = (id) =>
    setTodos((s) =>
      s.map((t) => (t.id === id ? { ...t, priority: NEXT_PRIORITY[t.priority] } : t))
    );
  const remove = (id) => {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, removing: true } : t)));
    setTimeout(() => setTodos((s) => s.filter((t) => t.id !== id)), 260);
  };
  const clearDone = () => {
    setTodos((s) => s.map((t) => (t.done ? { ...t, removing: true } : t)));
    setTimeout(() => setTodos((s) => s.filter((t) => !t.done)), 260);
  };

  const remaining = todos.filter((t) => !t.done).length;
  const doneCount = todos.filter((t) => t.done).length;
  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  );
  const emptyMsg =
    filter === 'completed'
      ? 'ยังไม่มีรายการที่เสร็จแล้ว'
      : filter === 'active'
      ? 'ไม่มีงานค้างแล้ว เยี่ยมมาก!'
      : 'ยังไม่มีรายการ เพิ่มงานแรกของคุณด้านบนได้เลย';

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:py-14">
      <header className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <ListChecks size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">สิ่งที่ต้องทำ</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">จัดการงานของคุณให้เป็นระเบียบ</p>
        </div>
      </header>

      <section className="mb-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-md dark:border-white/10 dark:bg-[#1a1d24]">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มงานใหม่..."
            aria-label="เพิ่มงานใหม่"
            className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-white/10 dark:bg-[#0f1115] dark:text-gray-100 dark:focus:ring-indigo-500/40"
          />
          <button
            onClick={add}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">เพิ่ม</span>
            <span className="sr-only sm:hidden">เพิ่ม</span>
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">ความสำคัญ</span>
          <div className="flex gap-1.5">
            {Object.entries(PRIORITIES).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setPriority(k)}
                aria-pressed={priority === k}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition-colors ${
                  priority === k
                    ? `${v.badge} font-semibold ring-1 ring-current`
                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${v.dot}`} />
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <nav className="mb-4 flex rounded-xl bg-gray-200/70 p-1 dark:bg-white/5" role="tablist">
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            role="tab"
            aria-selected={filter === k}
            onClick={() => setFilter(k)}
            className={`flex-1 rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
              filter === k
                ? 'bg-white text-indigo-700 shadow-sm dark:bg-[#1a1d24] dark:text-indigo-300'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <ul className="list-none p-0">
        {visible.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onToggle={toggle}
            onDelete={remove}
            onEdit={edit}
            onCycle={cycle}
          />
        ))}
      </ul>
      {visible.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white/60 px-4 py-10 text-center text-gray-500 dark:border-white/15 dark:bg-white/5 dark:text-gray-400">
          {emptyMsg}
        </div>
      )}

      <footer className="mt-4 flex items-center justify-between px-1 text-sm text-gray-600 dark:text-gray-400">
        <span>
          เหลืออีก <strong className="text-gray-900 dark:text-gray-100">{remaining}</strong> งาน
        </span>
        <button
          onClick={clearDone}
          disabled={doneCount === 0}
          className="rounded-lg px-3 py-1.5 font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent dark:hover:bg-rose-500/10"
        >
          ล้างที่เสร็จแล้ว{doneCount > 0 ? ` (${doneCount})` : ''}
        </button>
      </footer>
      <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
        เคล็ดลับ: ดับเบิลคลิกที่ข้อความเพื่อแก้ไข • แตะป้ายความสำคัญเพื่อเปลี่ยนระดับ
      </p>
    </main>
  );
}
