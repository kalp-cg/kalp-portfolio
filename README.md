# Kalp Patel - Portfolio Website

A modern, responsive portfolio website built with React, showcasing my skills, projects, and photography work. Features a dark/light theme toggle, smooth animations, and an interactive gallery.

## 🌟 Features

### 🎨 Design & UX
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes with persistent state
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Modern UI**: Clean, professional design with Tailwind CSS

### 📱 Navigation
- **Sidebar Navigation**: Collapsible sidebar with smooth transitions
- **Mobile Menu**: Responsive mobile navigation with hamburger menu
- **Active Route Highlighting**: Visual feedback for current page
- **Social Links**: Quick access to GitHub, LinkedIn, and Twitter

### 🏠 Pages
- **Home**: Hero section with animated typing effect and call-to-action buttons
- **About**: Personal information, skills, education, and experience
- **Resume**: Professional certificates and achievements
- **Projects**: Portfolio showcase with category filtering
- **Clicks**: Photography gallery with interactive features
- **Contact**: Contact form with Google Maps integration

### 🖼️ Photography Gallery (Clicks Page)
- **Category Filtering**: Filter photos by landscape, forest, seascape, flora, winter, desert
- **Interactive Lightbox**: Full-screen image viewer with navigation
- **Like/View Tracking**: Track engagement with localStorage persistence
- **Share Functionality**: Native share API with clipboard fallback
- **Keyboard Navigation**: Arrow keys and escape key support

### 🛠️ Technical Features
- **Theme Context**: Global state management for theme switching
- **Route Transitions**: Smooth page transitions with AnimatePresence
- **Form Handling**: Contact form with validation
- **Performance**: Optimized images and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Technologies Used

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing
- **Framer Motion**: Animation library for smooth transitions
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library for consistent design

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Additional Libraries
- **PropTypes**: Runtime type checking for React components
- **React Icons**: Comprehensive icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kalp-portfolio.git
   cd kalp-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
kalp-portfolio/
├── public/
│   ├── assets/
│   │   └── images/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── shared/
│   │       ├── Certificates.jsx
│   │       ├── ContactForm.jsx
│   │       ├── Education.jsx
│   │       ├── Experience.jsx
│   │       ├── ImageViewer.jsx
│   │       ├── Logo.jsx
│   │       ├── PageLoader.jsx
│   │       ├── PersonalInfo.jsx
│   │       ├── ProjectItem.jsx
│   │       ├── ResumeButton.jsx
│   │       └── Skills.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── AboutPage.jsx
│   ├── App.jsx
│   ├── ClicksPage.jsx
│   ├── ContactPage.jsx
│   ├── Header.jsx
│   ├── HomePage.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── ProjectsPage.jsx
│   ├── ResumePage.jsx
│   └── Sidebar.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Components

### ThemeContext
- Global theme state management
- localStorage persistence
- Theme toggle functionality
- Transition direction controls

### Navigation Components
- **Header**: Responsive header with theme toggle and mobile menu
- **Sidebar**: Collapsible sidebar with navigation and social links

### Page Components
- **HomePage**: Hero section with animated content
- **AboutPage**: Personal information and skills
- **ProjectsPage**: Portfolio showcase with filtering
- **ClicksPage**: Interactive photography gallery
- **ContactPage**: Contact form and location info
- **ResumePage**: Certificates and achievements

## 🎨 Customization

### Theme Colors
The primary color can be customized in the CSS variables:
```css
:root {
  --color-primary: #your-color-here;
}
```

### Content Updates
- Update personal information in `AboutPage.jsx`
- Add projects in `ProjectsPage.jsx`
- Upload photos to the gallery in `ClicksPage.jsx`
- Modify contact information in `ContactPage.jsx`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

### Code Style
- ESLint configuration for consistent code style
- PropTypes for component prop validation
- Functional components with hooks

### Performance
- Lazy loading for images
- Optimized animations
- Efficient state management

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: kalppatel1209@gmail.com
- **GitHub**: [kalp-cg](https://github.com/kalp-cg)
- **LinkedIn**: [Kalp Patel](https://www.linkedin.com/in/kalp-patel-/)
- **Twitter**: [@patel_kalp92111](https://x.com/patel_kalp92111)

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
