interface CricketBatProps {
    className?: string;
  }
  
export const CricketBat: React.FC<CricketBatProps> = ({ className }) => {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M12 17l-1.004 1.002a1.5 1.5 0 01-2.118-2.118L11 14m-4-4l-1.002-1.004a1.5 1.5 0 012.118-2.118L10 10m4-8v1m-4-1v1m12 8h-1m1-4h-1m2 3h-1m1-6h-1M6 6.882l1.793-1.793m10.414 0L18 6.882m-7 1.114V17m0-7l1.793-1.793m-7.586 3.586l-1.793 1.793m13.963-1.793l-1.793-1.793"
          stroke="currentColor"
        />
      </svg>
    );
  };