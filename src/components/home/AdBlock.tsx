

interface AdBlockProps {
    className?: string; // Allow custom sizing
    label?: string;
}

export function AdBlock({ className = "h-32", label = "اشتہار" }: AdBlockProps) {
    return (
        <div className={`w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col justify-center items-center ${className} my-8 transition-colors`}>
            <span className="text-[12px] text-gray-400 dark:text-gray-500 tracking-widest font-sans mb-1">اشتہار</span>
            <div className="text-gray-300 font-bold text-xl tracking-widest">{label}</div>
        </div>
    );
}
