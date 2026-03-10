import { useState } from "react";
import { useMembers } from "@/hooks/useMembers";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import MemberCard from "./MemberCard";

interface MemberSearchProps {
  operatorName: string;
}

const MemberSearch = ({ operatorName }: MemberSearchProps) => {
  const [query, setQuery] = useState("");
  const { data: members, isLoading } = useMembers(query);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="SEARCH MEMBER BY NAME..."
          className="pl-10 font-body uppercase"
        />
      </div>
      <div className="space-y-2 max-h-[55vh] overflow-y-auto">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)
        ) : !members || members.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 text-sm uppercase">
            {query ? "NO MEMBERS FOUND" : "NO MEMBERS YET. ADD OR IMPORT MEMBERS."}
          </p>
        ) : (
          members.map(m => <MemberCard key={m.id} member={m} operatorName={operatorName} />)
        )}
      </div>
    </div>
  );
};

export default MemberSearch;
