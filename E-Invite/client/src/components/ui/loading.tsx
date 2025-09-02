export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full border-b-2 border-primary ${className}`}></div>
  );
}

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted rounded ${className}`}></div>
  );
}
