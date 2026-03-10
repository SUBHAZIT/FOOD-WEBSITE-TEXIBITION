import { useState } from "react";
import { Member } from "@/types/member";
import { useApproveFood } from "@/hooks/useMembers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface MemberCardProps {
  member: Member;
  operatorName: string;
}

const MemberCard = ({ member, operatorName }: MemberCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const approveFood = useApproveFood();

  const handleApprove = (day: 1 | 2) => {
    approveFood.mutate(
      { memberId: member.id, day, approverName: operatorName },
      {
        onSuccess: () => toast.success(`DAY ${day} FOOD APPROVED FOR ${member.name.toUpperCase()}`),
        onError: (err) => toast.error(err.message, { icon: <AlertTriangle className="w-4 h-4" /> }),
      }
    );
  };

  return (
    <Card
      className="border shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in"
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="min-w-0">
              <p className="font-heading font-semibold text-sm text-foreground truncate uppercase">{member.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Badge variant={member.day1_approved ? "default" : "outline"} className={`text-[10px] px-1.5 py-0 uppercase ${member.day1_approved ? "gradient-primary text-primary-foreground" : ""}`}>
              D1 {member.day1_approved ? <Check className="w-3 h-3 ml-0.5" /> : <X className="w-3 h-3 ml-0.5" />}
            </Badge>
            <Badge variant={member.day2_approved ? "default" : "outline"} className={`text-[10px] px-1.5 py-0 uppercase ${member.day2_approved ? "gradient-primary text-primary-foreground" : ""}`}>
              D2 {member.day2_approved ? <Check className="w-3 h-3 ml-0.5" /> : <X className="w-3 h-3 ml-0.5" />}
            </Badge>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t space-y-3 animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Button
                  size="sm"
                  className={`w-full text-xs uppercase font-heading ${member.day1_approved ? "bg-muted text-muted-foreground" : "gradient-primary text-primary-foreground"}`}
                  disabled={member.day1_approved || approveFood.isPending}
                  onClick={() => handleApprove(1)}
                >
                  {member.day1_approved ? "✓ DAY 1 DONE" : "APPROVE DAY 1"}
                </Button>
                {member.day1_approved && (
                  <p className="text-[9px] text-muted-foreground mt-1 text-center uppercase">
                    {new Date(member.day1_time!).toLocaleString("en-IN")} • {member.day1_approved_by}
                  </p>
                )}
              </div>
              <div>
                <Button
                  size="sm"
                  className={`w-full text-xs uppercase font-heading ${member.day2_approved ? "bg-muted text-muted-foreground" : "gradient-primary text-primary-foreground"}`}
                  disabled={member.day2_approved || approveFood.isPending}
                  onClick={() => handleApprove(2)}
                >
                  {member.day2_approved ? "✓ DAY 2 DONE" : "APPROVE DAY 2"}
                </Button>
                {member.day2_approved && (
                  <p className="text-[9px] text-muted-foreground mt-1 text-center uppercase">
                    {new Date(member.day2_time!).toLocaleString("en-IN")} • {member.day2_approved_by}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberCard;
