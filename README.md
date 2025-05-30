# Hit Your Protein 💪

A simple, scientific daily protein calculator built with React, TypeScript, and TailwindCSS. Get your personalized protein needs based on current sports nutrition research - answers the question: **"How much protein do I need to consume daily?"**

## 🎯 Purpose

This calculator provides a **single, clear answer**: your daily protein requirement in grams, based on your body weight and fitness goals. No tracking, no complexity - just scientifically-backed protein calculations.

## 🌟 Features

### Core Functionality

- **Scientific Protein Calculation**: Based on current sports nutrition research (0.8-1.2g per lb)
- **Dual Unit Support**: Works with both pounds (lb) and kilograms (kg)
- **Three Goal Categories**: Maintain, Build, or Maximize muscle/performance
- **Instant Results**: Get your daily protein target immediately
- **Meal Distribution**: See how to spread protein throughout the day

### User Experience

- **Simple 3-Step Setup**: Name → Body stats → Goal selection
- **Mobile-Friendly**: Responsive design that works on all devices
- **No Registration**: All data stored locally in your browser
- **Clean Interface**: Focus on the answer you need without distractions

## 🧮 Protein Calculation (Based on Research)

The app uses evidence-based protein factors:

| Goal                            | Protein per Pound | Example (180 lb person) |
| ------------------------------- | ----------------- | ----------------------- |
| **Maintain** (Minimum)          | 0.8g/lb           | 144g per day            |
| **Build** (Recommended)         | 1.0g/lb           | 180g per day            |
| **Maximize** (High Performance) | 1.2g/lb           | 216g per day            |

### How It Works

```
Your Weight × Protein Factor = Daily Protein Needs
```

Examples:

- **150 lb person, Build goal**: 150 × 1.0 = **150g protein/day**
- **70 kg person, Maximize goal**: 70 kg (154 lb) × 1.2 = **185g protein/day**

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ignazio-00/hit-your-protein.git
   cd hit-your-protein
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📱 How to Use

### Quick 3-Step Process

1. **Enter Your Name**

   - Simple personal identification

2. **Body Information**

   - Weight (with kg/lb toggle)
   - Height, age, gender for context

3. **Select Your Goal**

   - **Maintain**: Build or maintain muscle (minimum requirement)
   - **Build**: Muscle building (recommended for most people)
   - **Maximize**: High performance/intense training

4. **Get Your Answer**
   - See your daily protein target in grams
   - View the calculation breakdown
   - Get meal distribution recommendations

### What You'll See

- **Main Result**: Large, clear daily protein target (e.g., "156g")
- **Calculation Breakdown**: How the number was calculated
- **Meal Distribution**: Suggested protein per meal
- **Goal Comparison**: See protein needs for all three goals
- **Scientific Context**: Research-based explanations

## 🛠️ Tech Stack

- **React 18** with TypeScript for type safety
- **TailwindCSS** for modern, responsive styling
- **Vite** for fast development and optimized builds
- **Lucide React** for clean, consistent icons
- **localStorage** for data persistence (no backend needed)

## 🧬 Scientific Foundation

### Research Basis

- Based on current sports nutrition guidelines
- Simplified from complex research into practical recommendations
- Focuses on grams per pound for easy understanding

### Key Points

- **0.8g/lb**: Minimum for muscle maintenance
- **1.0g/lb**: Optimal for most muscle-building goals
- **1.2g/lb**: For intense training or maximizing muscle growth

## 🎯 Use Cases

### Perfect For:

- Beginners wanting to know their protein needs
- Athletes needing quick protein calculations
- Anyone asking "How much protein should I eat?"
- Fitness enthusiasts planning their nutrition
- People who want science-based recommendations without complexity

### What This App Does NOT Do:

- ❌ Food tracking or logging
- ❌ Progress monitoring over time
- ❌ Calorie counting
- ❌ Detailed nutrition analysis
- ❌ Meal planning beyond protein distribution

## 📊 Example Calculations

### 150 lb person:

- Maintain: 150 × 0.8 = **120g/day**
- Build: 150 × 1.0 = **150g/day**
- Maximize: 150 × 1.2 = **180g/day**

### 70 kg (154 lb) person:

- Maintain: 154 × 0.8 = **123g/day**
- Build: 154 × 1.0 = **154g/day**
- Maximize: 154 × 1.2 = **185g/day**

## 🔧 Development

### Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── Onboarding.tsx
│   └── ProteinCalculator.tsx
├── utils/
│   ├── proteinCalculator.ts
│   ├── storage.ts
│   └── dateUtils.ts
├── types.ts
└── App.tsx
```

### Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build locally

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- Additional scientific validation
- UI/UX enhancements
- Mobile optimization
- Accessibility improvements

## 📝 License

MIT License - see LICENSE file for details.

---

**Hit Your Protein** - Get your answer in 3 simple steps! 💪

_"How much protein do I need daily?" - We've got the answer._
