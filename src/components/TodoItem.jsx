import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, Trash2 } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../constants';
import { dueState, formatDue } from '../utils';

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onCycle }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const save = () => {
    const t = draft.trim();
    if (t) onEdit(todo.id, t);
    else setDraft(todo.text);
    setEditing(false);
  };

  const p = PRIORITIES[todo.priority];
  const cat = CATEGORIES[todo.category];
  const ds = dueState(todo);
  const dueStyle = {
    overdue: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    today: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
    upcoming: 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300',
  };
  const dueText = ds === 'overdue' ? 'เกินกำหนด ' : ds === 'today' ? 'วันนี้' : '';

  return (
    <li className={`item ${todo.removing ? 'removing' : ''} mb-2`}>
      <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 shadow-sm dark:border-white/10 dark:bg-[#1a1d24]">
        <button
          onClick={() => onToggle(todo.id)}
          aria-label={todo.done ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
            todo.done
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-gray-300 text-transparent hover:border-indigo-400 dark:border-gray-600'
          }`}
        >
          <Check size={14} strokeWidth={3} />
        </button>

        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save();
                if (e.key === 'Escape') {
                  setDraft(todo.text);
                  setEditing(false);
                }
              }}
              className="w-full rounded-md border border-indigo-300 bg-white px-2 py-1 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#0f1115] dark:text-gray-100"
            />
          ) : (
            <span
              onDoubleClick={() => {
                setDraft(todo.text);
                setEditing(true);
              }}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className={`block cursor-text select-none break-words text-base ${
                todo.done
                  ? 'text-gray-400 line-through dark:text-gray-500'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {todo.text}
            </span>
          )}
          {(cat || todo.due) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {cat && <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${cat.tag}`}>{cat.label}</span>}
              {todo.due && (
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${dueStyle[ds] || dueStyle.upcoming}`}>
                  <CalendarDays size={12} />
                  {ds === 'today' ? dueText : `${dueText}${formatDue(todo.due)}`}
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => onCycle(todo.id)}
          title="แตะเพื่อเปลี่ยนความสำคัญ"
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${p.badge}`}
        >
          {p.label}
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          aria-label="ลบรายการ"
          className="shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:hover:bg-rose-500/10"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}
