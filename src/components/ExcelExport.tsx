import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from "xlsx";
import { toast } from "sonner";

const ExcelExport = () => {
  const handleExport = async () => {
    const { data: members, error } = await supabase.from("members").select("*").order("name");
    if (error) { toast.error("FAILED TO EXPORT"); return; }
    if (!members?.length) { toast.error("NO DATA TO EXPORT"); return; }

    const data = members.map(m => ({
      NAME: m.name.toUpperCase(),
      POSITION: m.position.toUpperCase(),
      "FOOD TYPE": m.food_type.toUpperCase(),
      "DAY 1 STATUS": m.day1_approved ? "COLLECTED" : "NOT COLLECTED",
      "DAY 1 TIME": m.day1_time ? new Date(m.day1_time).toLocaleString("en-IN") : "-",
      "DAY 1 APPROVED BY": m.day1_approved_by?.toUpperCase() || "-",
      "DAY 2 STATUS": m.day2_approved ? "COLLECTED" : "NOT COLLECTED",
      "DAY 2 TIME": m.day2_time ? new Date(m.day2_time).toLocaleString("en-IN") : "-",
      "DAY 2 APPROVED BY": m.day2_approved_by?.toUpperCase() || "-",
      ATTENDANCE: (m.day1_approved || m.day2_approved) ? "PRESENT" : "ABSENT",
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "FOOD ATTENDANCE");
    XLSX.writeFile(wb, "texibition_food_attendance.xlsx");
    toast.success("EXPORTED SUCCESSFULLY");
  };

  return (
    <Button size="sm" variant="outline" onClick={handleExport} className="uppercase text-xs font-heading">
      <Download className="w-4 h-4 mr-1" />
      EXPORT
    </Button>
  );
};

export default ExcelExport;
