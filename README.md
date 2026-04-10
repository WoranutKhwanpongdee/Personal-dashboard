# 🌟 Personal Dashboard

Personal Dashboard เว็บแอปพลิเคชันที่รวบรวม Widget ที่จำเป็นสำหรับชีวิตประจำวัน ด้วยดีไซน์แบบ Glassmorphism ที่ทันสมัยและใช้งานง่าย


## ✨ Features

### 🌤️ สภาพอากาศ
- แสดงสภาพอากาศปัจจุบัน
- ค้นหาสภาพอากาศตามชื่อเมือง
- แสดงอุณหภูมิ ความชื้น ความเร็วลม

### 📅 ปฏิทิน
- แสดงปฏิทินรายเดือน
- ไฮไลต์วันปัจจุบัน
- เปลี่ยนเดือนได้

### ✅ To-do List
- เพิ่ม/ลบ/แก้ไขรายการ
- Filter ตามสถานะ (ทั้งหมด/ยังไม่ทำ/เสร็จแล้ว)
- เก็บข้อมูลใน LocalStorage

### 📝 โน้ตด่วน
- จดบันทึกสั้นๆ
- แก้ไขและลบโน้ตได้
- แสดงเวลาที่สร้าง

### 💬 คำคมประจำวัน
- สุ่มคำคมจาก API
- กด refresh เพื่อเปลี่ยนคำคม

### 🎨 อื่นๆ
- 🌙 Dark/Light Mode
- 💾 Backup/Restore ข้อมูล (JSON)
- ⌨️ Keyboard Shortcuts
- 📱 Responsive Design

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS + Glassmorphism
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks + LocalStorage
- **APIs**: OpenWeatherMap API, Quotable API

## 🚀 Quick Start

### ติดตั้งและรันโปรเจค

```bash
# Clone โปรเจค
git clone https://github.com/your-username/personal-dashboard.git
cd personal-dashboard

# ติดตั้ง dependencies
npm install

# รันโปรเจค
npm run dev
