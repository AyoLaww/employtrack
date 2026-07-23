interface StatusBadgeProps {
    status: string;
  }
  
  const variants: Record<string, string> = {
    applied: "bg-[#E4E4E4] border-applied/20",
    interviewing: "bg-interviewing/15 border-interviewing/20",
    offer: "bg-offer/15 border-offer/20",
    accepted: "bg-accepted/15 border-accepted/20",
    rejected: "bg-rejected/15 border-rejected/20",
  };
  
  export function StatusBadge({ status }: StatusBadgeProps) {
    return (
      <span
        className={`inline-flex tracking-tighter items-center rounded-[3px] border px-[8px] py-[3px] text-[14px] font-sans font-medium ${variants[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }