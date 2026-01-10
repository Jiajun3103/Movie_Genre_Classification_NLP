//C:\Users\user\Documents\a y3s1\NATURAL LANGUAGE PROCESSING\project2\NLP_PROJECT\src\app\App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { FloatingChatbot } from './components/FloatingChatbot';
import { HomePage } from './pages/HomePage';
import { ClassifyPage } from './pages/ClassifyPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/classify" element={<ClassifyPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <FloatingChatbot />
      </div>
    </BrowserRouter>
  );
}