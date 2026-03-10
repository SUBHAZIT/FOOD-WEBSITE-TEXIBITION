import { useStats } from "@/hooks/useMembers";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UtensilsCrossed, CalendarCheck, CalendarX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const StatsCards = () => {
  const { data: stats, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="border shadow-sm"><CardContent className="p-3"><Skeleton className="h-10 w-full" /></CardContent></Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const items = [
    { label: "TOTAL MEMBERS", value: stats.total, icon: Users, color: "text-primary" },
    { label: "FOOD GIVEN", value: stats.totalFood, icon: UtensilsCrossed, color: "text-secondary" },
    { label: "DAY 1", value: stats.day1, icon: CalendarCheck, color: "text-success" },
    { label: "DAY 2", value: stats.day2, icon: CalendarCheck, color: "text-accent" },
    { label: "PRESENT", value: stats.present, icon: CalendarCheck, color: "text-primary" },
    { label: "ABSENT", value: stats.absent, icon: CalendarX, color: "text-muted-foreground" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map(s => (
        <Card key={s.label} className="border shadow-sm animate-fade-in">
          <CardContent className="p-3 flex items-center gap-3">
            <s.icon className={`w-5 h-5 ${s.color} shrink-0`} />
            <div>
              <p className="text-xl font-heading font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
