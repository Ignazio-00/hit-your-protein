interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} animate-spin`}>
        <div className="h-full w-full rounded-full border-4 border-gray-200 border-t-primary-500"></div>
      </div>
      {text && <p className="text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
