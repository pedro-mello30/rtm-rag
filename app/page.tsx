import Chat from './components/Chat';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#308eff]">
      <main className="max-w-4xl mx-auto">
        <Chat />
      </main>

      {/* Watermark */}
      <Link 
        href="https://walee.ai/waitlist" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full text-white/80 hover:text-white text-sm transition-all duration-300 group z-50"
      >
        <span className="opacity-60 group-hover:opacity-100">
          Powered by
        </span>
        <span className="font-bold text-[#fec61d] group-hover:scale-105 transition-transform">
          Walee.ai
        </span>
        {/* <div className="w-5 h-5 relative">
          <Image
            src="/walee-icon.png"
            alt="Walee.ai"
            fill
            className="object-contain"
          />
        </div> */}
      </Link>
    </div>
  );
}
