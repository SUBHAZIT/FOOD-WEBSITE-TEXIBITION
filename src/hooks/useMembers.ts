import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMembers(search?: string) {
  return useQuery({
    queryKey: ["members", search],
    queryFn: async () => {
      let query = supabase.from("members").select("*").order("name");
      if (search?.trim()) {
        query = query.ilike("name", `%${search.trim()}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    refetchInterval: 5000, // Auto-refresh every 5s for multi-device sync
  });
}

export function useAddMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (member: { name: string; position: string; food_type: string }) => {
      const { error } = await supabase.from("members").insert(member);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["members"] }),
  });
}

export function useBulkAddMembers() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (members: { name: string; position: string; food_type: string }[]) => {
      const { error } = await supabase.from("members").insert(members);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["members"] }),
  });
}

export function useApproveFood() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ memberId, day, approverName }: { memberId: string; day: 1 | 2; approverName: string }) => {
      // First check if already approved
      const { data: member, error: fetchError } = await supabase
        .from("members")
        .select("*")
        .eq("id", memberId)
        .single();
      if (fetchError) throw fetchError;

      const key = day === 1 ? "day1" : "day2";
      if (member[`${key}_approved`]) {
        throw new Error(`FOOD ALREADY COLLECTED FOR DAY ${day} AT ${new Date(member[`${key}_time`]!).toLocaleString("en-IN")}`);
      }

      const updateData: Record<string, unknown> = {};
      updateData[`${key}_approved`] = true;
      updateData[`${key}_time`] = new Date().toISOString();
      updateData[`${key}_approved_by`] = approverName;

      const { error } = await supabase.from("members").update(updateData).eq("id", memberId);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["members"] }),
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["members-stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("members").select("*");
      if (error) throw error;
      const members = data || [];
      return {
        total: members.length,
        day1: members.filter(m => m.day1_approved).length,
        day2: members.filter(m => m.day2_approved).length,
        totalFood: members.filter(m => m.day1_approved).length + members.filter(m => m.day2_approved).length,
        veg: members.filter(m => m.food_type === "Veg").length,
        nonVeg: members.filter(m => m.food_type === "Non Veg").length,
        present: members.filter(m => m.day1_approved || m.day2_approved).length,
        absent: members.filter(m => !m.day1_approved && !m.day2_approved).length,
      };
    },
    refetchInterval: 5000,
  });
}
