const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayStr = () => fmt(new Date());
export const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return fmt(d);
};

// 'overdue' | 'today' | 'upcoming' | null (no date or already done)
export const dueState = (todo) => {
  if (!todo.due || todo.done) return null;
  const t = todayStr();
  return todo.due < t ? 'overdue' : todo.due === t ? 'today' : 'upcoming';
};

export const formatDue = (s) =>
  new Date(`${s}T00:00:00`).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
