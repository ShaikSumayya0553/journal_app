import { useEffect } from "react";

function Toast({ message, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgClass =
    type === "success"
      ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/20 text-white"
      : "bg-gradient-to-r from-rose-500 to-red-600 shadow-rose-500/20 text-white";

  const icon =
    type === "success" ? (
      <svg className="w-5 h-5 mr-3 flex-shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-5 h-5 mr-3 flex-shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center px-5 py-4 rounded-2xl shadow-xl transition-all duration-300 ease-out border border-white/10 animate-slide-in ${bgClass}`}>
      {icon}
      <span className="font-medium text-sm pr-2">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-auto p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none"
        aria-label="Close notification"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
