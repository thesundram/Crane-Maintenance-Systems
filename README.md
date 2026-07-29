# 🏗️ Crane Maintenance Manager

An enterprise-grade digital scheduling, tracking, diagnostic AI analytics, and safety compliance system for factory overhead cranes.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![AI Powered](https://img.shields.io/badge/AI-Diagnostic_Engine-emerald?style=for-the-badge)

---

## 📌 Overview

The **Crane Maintenance Manager** is built for industrial plant managers, maintenance engineers, and safety inspectors to streamline the maintenance lifecycle of factory overhead cranes. It provides end-to-end operational visibility—from daily inspection logs and spare parts inventory to AI-generated diagnostic consultant reports complying with **ASME B30.2** and **OSHA 1910.179** standards.

---

## ✨ Key Features

### 1. 🏗️ Fleet Crane Overview
- Monitor factory overhead cranes across halls (e.g. `CRANE-001` to `CRANE-006`, 10T–25T lifting capacity).
- Real-time status indicators (Operational, Maintenance Required, Critical Alert).

### 2. 📋 Daily Inspection Checklist
- Interactive digital checklists for daily, weekly, and monthly maintenance checks.
- Parameter checks for wire ropes, brake response times, hoist limit switches, motors, and electrical lines.

### 3. 📜 Maintenance History & Diagnostic Logs
- Comprehensive audit trails of pass/fail inspections.
- Detailed issue records with severity classifications (High, Medium, Low).

### 4. 🛠️ Standard Operating Procedures (SOPs)
- Step-by-step guidelines for wire rope replacement, limit switch calibration, and brake pad servicing.

### 5. 📦 Spare Parts & Inventory Manager
- Track spare parts stock levels (wire ropes, brake linings, contactors, oil seals).
- Low-stock warnings and component re-ordering notifications.

### 6. 💰 Cost Planning & Budgeting
- Maintenance expenditure tracking, cost projections, and preventive budgeting tools.

### 7. 🤖 Executive AI Consultant & Diagnostic Report
- **Fleet Health Index & Analytics**: Evaluates overall fleet health score (%) and pinpoints components needing urgent attention.
- **Priority Action Roadmap**: Highlights critical safety tasks (e.g. Wire Rope replacement on `CRANE-003`, Limit Switch calibration on `CRANE-006`).
- **Safety & Compliance Verification**: Flags violations against **ASME B30.2** and **OSHA 1910.179** standards.
- **Dual View Modes**:
  - **Executive Dashboard**: Interactive visual cards with health meters, status chips, and priority tags.
  - **Full Consultant Report**: Formatted markdown text view for complete engineering review.
- **Crane Filter & Export Capabilities**:
  - Filter diagnostics by Crane ID (`ALL`, `CRANE-001`, `CRANE-003`, `CRANE-006`).
  - **Print / Save as PDF** (`window.print()`).
  - **Copy to Clipboard** with visual toast notification.
  - **Export TXT / MD** file download.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **UI & Styling**: React 19, Tailwind CSS v4, Radix UI Primitives, Shadcn UI
- **Icons**: Lucide React
- **AI Gateway Integration**: Vercel AI SDK / OpenAI GPT Models
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- pnpm / npm / yarn package manager

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SundramPandey/Crane-Maintenance-Systems.git
   cd Crane-Maintenance-Systems
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your AI Gateway credentials:
   ```env
   AI_GATEWAY_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

5. **Build for Production**
   ```bash
   pnpm build
   pnpm start
   ```

---

## 📁 Directory Structure

```text
├── app/
│   ├── api/
│   │   └── generate-report/    # AI Report Generation API route
│   ├── globals.css             # Tailwind & Theme design tokens
│   ├── layout.tsx              # Root Layout
│   └── page.tsx                # Main App Entry
├── components/
│   ├── ui/                     # Shadcn & Radix UI primitives
│   ├── ai-report.tsx           # AI Diagnostic Executive Dashboard
│   ├── main-dashboard.tsx      # Header, Tabs & Main Layout
│   ├── crane-list.tsx          # Crane Fleet Overview
│   ├── daily-checklist.tsx     # Inspection Checklists
│   ├── maintenance-history.tsx # History Audit Logs
│   ├── inventory-manager.tsx   # Spare Parts Inventory
│   ├── cost-planning.tsx       # Cost Budgeting
│   ├── procedures.tsx          # SOP Manuals
│   └── footer.tsx              # Footer Component
├── public/                     # Static Assets & Icons
├── README.md
└── package.json
```

---

## 🏢 Developed By

**Sundram Pandey - Uttam Innovative Solution Pvt. Ltd.**
