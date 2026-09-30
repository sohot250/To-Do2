# Thai Todo (Vite + React + Tailwind)

แอปรายการสิ่งที่ต้องทำ UI ภาษาไทย — ข้อมูลเก็บใน React state เท่านั้น (ไม่ใช้ localStorage)

## เริ่มใช้งาน

```bash
npm install
npm run dev      # เปิด http://localhost:5173
npm run build    # สร้างไฟล์ production ใน dist/
npm run preview  # ทดลองรันไฟล์ที่ build แล้ว
```

## โครงสร้าง

- `src/App.jsx` — หน้าหลัก, state และตรรกะทั้งหมด
- `src/components/TodoItem.jsx` — รายการงาน (ติ๊ก, แก้ไข inline, ลบ)
- `src/constants.js` — ระดับความสำคัญและตัวกรอง
