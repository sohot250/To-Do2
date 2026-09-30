export const PRIORITIES = {
  low: { label: 'ต่ำ', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300', dot: 'bg-emerald-500' },
  medium: { label: 'ปานกลาง', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300', dot: 'bg-amber-500' },
  high: { label: 'สูง', badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300', dot: 'bg-rose-500' },
};

export const NEXT_PRIORITY = { low: 'medium', medium: 'high', high: 'low' };

export const CATEGORIES = {
  work: { label: 'งาน', tag: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300', dot: 'bg-sky-500' },
  personal: { label: 'ส่วนตัว', tag: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300', dot: 'bg-violet-500' },
  shopping: { label: 'ช้อปปิ้ง', tag: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300', dot: 'bg-pink-500' },
  health: { label: 'สุขภาพ', tag: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300', dot: 'bg-teal-500' },
};

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['completed', 'เสร็จแล้ว'],
];
