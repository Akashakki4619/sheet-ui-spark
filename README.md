# React Spreadsheet Interface

A pixel-perfect spreadsheet interface built with React 18, TypeScript, and Tailwind CSS, replicating the design and functionality of modern spreadsheet applications like Google Sheets.

## 🚀 Features

### Core Functionality
- **Interactive Grid**: Full spreadsheet-like table with cell selection and navigation
- **Keyboard Navigation**: Arrow keys for cell navigation, Enter for editing
- **Sorting**: Click column headers to sort data ascending/descending
- **Status Management**: Color-coded status badges (Complete, In-process, Need to start, Blocked)
- **Priority Indicators**: Visual priority levels (High, Medium, Low)
- **Interactive Toolbar**: Functional buttons for common spreadsheet operations

### User Interface
- **Pixel-Perfect Design**: Matches the provided Figma specifications
- **Responsive Layout**: Works on different screen sizes
- **Hover Effects**: Row and cell highlighting for better UX
- **Tab System**: Multiple sheet tabs with active state management
- **Toast Notifications**: User feedback for all interactive actions

### Technical Features
- **TypeScript Strict Mode**: Full type safety throughout the application
- **Clean Architecture**: Modular component structure
- **Performance Optimized**: Efficient rendering and state management
- **Accessibility**: Keyboard navigation and semantic HTML

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Strict mode for maximum type safety
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful and consistent icons
- **Vite** - Fast build tool and development server

## 🏗️ Project Structure

```
src/
├── components/
│   ├── spreadsheet/
│   │   ├── Spreadsheet.tsx          # Main container component
│   │   ├── SpreadsheetTable.tsx     # Table with keyboard navigation
│   │   ├── SpreadsheetToolbar.tsx   # Top toolbar with actions
│   │   ├── SpreadsheetTabs.tsx      # Sheet tabs interface
│   │   ├── StatusBadge.tsx          # Status indicator component
│   │   └── PriorityIndicator.tsx    # Priority display component
│   └── ui/                          # Shadcn UI components
├── hooks/                           # Custom React hooks
├── lib/                             # Utility functions
└── pages/                           # Application pages
```

## 🎨 Design System

The application uses a comprehensive design system defined in `src/index.css` and `tailwind.config.ts`:

### Color Palette
- **Sheet Colors**: Background, headers, borders, hover states
- **Status Colors**: Complete (green), In-process (yellow), Need to start (blue), Blocked (red)
- **Priority Colors**: High (red), Medium (yellow), Low (blue)
- **Interactive States**: Hover, selected, focus states

### Design Principles
- Semantic color tokens instead of hardcoded values
- Consistent spacing and typography
- Accessible contrast ratios
- Professional spreadsheet aesthetics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-spreadsheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Run linting**
   ```bash
   npm run lint
   ```

6. **Run type checking**
   ```bash
   npm run type-check
   ```

## 🎮 Interactive Features

### Keyboard Navigation
- **Arrow Keys**: Navigate between cells
- **Enter**: Start editing selected cell
- **Tab**: Move to next cell
- **Escape**: Cancel editing

### Mouse Interactions
- **Single Click**: Select cell
- **Double Click**: Start editing cell
- **Header Click**: Sort by column
- **Row Hover**: Highlight entire row

### Toolbar Actions
- **Sort**: Toggle ascending/descending sort
- **Filter**: Open filter options
- **Import/Export**: Data management actions
- **Share**: Collaboration features
- **New Action**: Add new entries

## 📱 Responsive Design

The interface is fully responsive and works on:
- Desktop computers (optimal experience)
- Tablets (touch-friendly interactions)
- Large mobile devices (simplified layout)

## 🔧 Development

### Code Quality
- **ESLint**: Configured for React and TypeScript
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting (via IDE extensions)
- **Component Architecture**: Modular and reusable

### Performance Considerations
- Virtual scrolling for large datasets (future enhancement)
- Optimized re-renders with proper key props
- Efficient state management with local state
- Memoized components where beneficial

## 🚦 Trade-offs Made

1. **Mock Data**: Using static data instead of API integration for prototype
2. **Local State**: Using component state instead of global state management
3. **Basic Editing**: Simple editing simulation instead of full inline editing
4. **Fixed Columns**: Column configuration is static rather than dynamic
5. **Single Sheet**: Multiple sheet functionality is UI-only

## 🔮 Future Enhancements

### Stretch Goals Implemented
- ✅ Keyboard navigation within the grid
- ✅ Interactive buttons and state changes
- ✅ Professional spreadsheet appearance

### Potential Additions
- Column resizing and reordering
- Row height adjustment
- Advanced filtering and search
- Data validation
- Formula support
- Real-time collaboration
- Export to Excel/CSV
- Undo/Redo functionality

## 📄 License

This project is created as a prototype demonstration and is available for educational and portfolio purposes.

## 🤝 Contributing

This is a prototype project, but suggestions and improvements are welcome through issues and pull requests.

---

**Live Demo**: [Deployed Application URL]  
**Repository**: [GitHub Repository URL]

Built with ❤️ using React, TypeScript, and Tailwind CSS