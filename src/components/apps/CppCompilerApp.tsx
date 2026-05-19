'use client';

export default function CppCompilerApp() {
  return (
    <div className="h-full w-full bg-[#0e0e14] flex flex-col">
      <div className="px-4 py-2 border-b border-white/[0.05] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 font-bold text-lg">C++</span>
          <span className="text-zinc-400 text-xs font-medium tracking-wide uppercase">Compiler Engine</span>
        </div>
        <div className="text-[10px] text-zinc-500 bg-white/[0.03] px-2 py-1 rounded-md">
          Powered by OneCompiler
        </div>
      </div>
      <div className="flex-1 w-full bg-black">
        <iframe
          src="https://onecompiler.com/embed/cpp?theme=dark"
          width="100%"
          height="100%"
          frameBorder="0"
          className="w-full h-full"
          title="C++ Compiler"
          allow="clipboard-write"
        ></iframe>
      </div>
    </div>
  );
}
