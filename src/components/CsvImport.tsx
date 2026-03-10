import { useRef } from "react";
import { useBulkAddMembers } from "@/hooks/useMembers";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";

const validPositions = ["Lead", "Volunteer", "Coordinator", "Mentor", "Judge"];
const validFoodTypes = ["Veg", "Non Veg"];

const CsvImport = () => {
  const bulkAdd = useBulkAddMembers();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const members: { name: string; position: string; food_type: string }[] = [];
        let skipped = 0;

        for (const row of results.data as Record<string, string>[]) {
          const name = (row.name || row.Name || "").trim();
          const pos = (row.position || row.Position || "").trim();
          const food = (row.foodType || row.FoodType || row["Food Type"] || row.food_type || "").trim();

          if (!name) { skipped++; continue; }
          const position = validPositions.includes(pos) ? pos : "Volunteer";
          const food_type = validFoodTypes.includes(food) ? food : "Veg";
          members.push({ name, position, food_type });
        }

        if (members.length > 0) {
          bulkAdd.mutate(members, {
            onSuccess: () => toast.success(`${members.length} MEMBERS IMPORTED${skipped ? `, ${skipped} SKIPPED` : ""}`),
            onError: () => toast.error("FAILED TO IMPORT MEMBERS"),
          });
        } else {
          toast.error("NO VALID MEMBERS FOUND IN CSV");
        }
      },
      error: () => toast.error("FAILED TO PARSE CSV FILE"),
    });

    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
      <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()} className="uppercase text-xs font-heading">
        <Upload className="w-4 h-4 mr-1" />
        CSV
      </Button>
    </>
  );
};

export default CsvImport;
