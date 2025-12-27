# Crane Maintenance System

A comprehensive digital scheduling and tracking system for factory overhead cranes, designed to streamline maintenance operations and ensure safety compliance.

## 🏗️ Main Components

### 📊 [Main Dashboard](./components/main-dashboard.tsx)
Central hub with tabbed interface providing:
- Overview of all crane operations
- Quick access to all maintenance modules
- Real-time status monitoring
- Progress tracking across all systems

### 🏗️ [Crane List](./components/crane-list.tsx)
Complete crane inventory management:
- 6 crane units with detailed specifications
- Real-time health status monitoring
- Capacity and location tracking
- Maintenance scheduling overview
- Quick stats dashboard

### ✅ [Daily Checklist](./components/daily-checklist.tsx)
Comprehensive maintenance checklist system:
- **Daily Checks**: Wire rope, hook latch, brake response, oil leakage
- **Weekly Checks**: Brake wear, rope strands, sheaves, control panels
- **Monthly Checks**: Gearbox oil analysis, load testing, IR testing
- Photo documentation support
- Items used tracking with lifecycle management
- Time-based activity logging

### 📦 [Inventory Manager](./components/inventory-manager.tsx)
Smart spare parts and tools management:
- Real-time stock level monitoring
- Low stock alerts and reorder notifications
- Supplier information and cost tracking
- Critical parts identification
- Inventory value calculations

### 📋 [Maintenance History](./components/maintenance-history.tsx)
Historical maintenance data tracking and analysis

### 📖 [Procedures](./components/procedures.tsx)
Standard operating procedures and maintenance guidelines

### 💰 [Cost Planning](./components/cost-planning.tsx)
Budget planning and cost analysis for maintenance operations

## 🚀 Features

- **Real-time Monitoring**: Live status updates for all crane units
- **Compliance Tracking**: Ensures adherence to IS standards and safety protocols
- **Digital Documentation**: Photo uploads and detailed observation logging
- **Smart Inventory**: Automated low-stock alerts and reorder management
- **Progress Tracking**: Visual progress indicators for maintenance tasks
- **Multi-level Checks**: Daily, weekly, and monthly maintenance schedules

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **UI Components**: Shadcn/ui with Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Styling**: Modern dark/light theme support

## 📱 User Interface

- Responsive design for desktop and mobile devices
- Intuitive tabbed navigation
- Real-time status indicators
- Progress tracking with visual feedback
- Modern card-based layout

## 🔧 Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📈 System Capacity

- Supports 3-10 crane units
- Scalable architecture for larger operations
- Configurable maintenance schedules
- Flexible inventory management

## 🏢 Developed By

**Sundram Pandey - Uttam Innovative Solution Pvt. Ltd.**

---

*Digital transformation for industrial maintenance operations*