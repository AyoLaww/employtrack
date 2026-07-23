type StatCardVariant =
  | "Total"
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Accepted"
  | "Rejected";

interface StatCardProps {
  title: string;
  value: number;
  variant?: StatCardVariant;
}

const variants: Record<StatCardVariant, string> = {
  Total: "border-l-total",
  Applied:   "border-l-applied",
  Interviewing: "border-l-interviewing",
  Offer: "border-l-offer",
  Accepted: "border-l-accepted",
  Rejected: "border-l-rejected",
};

export function StatCard({ title, value, variant = "Total" }: StatCardProps) {
  return (
    <div
      className={`w-60 h-[80px] border-l-8 bg-off-white border border-border-gray rounded-[3px] px-[16px] py-[8px] ${variants[variant]}`}
    >
        <div className="flex flex-col">
            <p className="font-medium text-[18px] font-serif">{title}</p>
            <p className="mt-1 text-[24px] text-foreground font-sans">{value}</p>
        </div>
    </div>
  );
}