import { Check } from 'lucide-react';

export default function StepIndicator({ steps, current }) {
  return (
    <div className="flex items-center px-4 py-4">
      {steps.map((step, index) => {
        const isActive = index === current;
        const isDone = index < current;
        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            {/* Dot */}
            <div className="flex flex-col items-center gap-1">
              <div className={`step-dot ${isActive ? 'step-dot-active' : isDone ? 'step-dot-done' : 'step-dot-inactive'}`}>
                {isDone ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
              </div>
              <span className={`text-[10px] font-semibold text-center leading-none ${
                isActive ? 'text-pink-500' : isDone ? 'text-emerald-600' : 'text-ink-300'
              }`}>{step}</span>
            </div>
            {/* Line */}
            {index < steps.length - 1 && (
              <div className={`step-line mx-2 ${isDone ? 'step-line-done' : 'step-line-inactive'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
