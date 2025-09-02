import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = targetDate.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary" data-testid="countdown-days">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">Days</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary" data-testid="countdown-hours">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary" data-testid="countdown-minutes">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-primary" data-testid="countdown-seconds">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">Seconds</div>
      </div>
    </div>
  );
}
