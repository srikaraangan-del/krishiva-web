import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import VoiceAssistant from './VoiceAssistant';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <VoiceAssistant />
    </div>
  );
}
