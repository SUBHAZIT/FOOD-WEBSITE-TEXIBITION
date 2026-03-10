import { Tables } from "@/integrations/supabase/types";

export type Member = Tables<"members">;
export type Position = "Lead" | "Volunteer" | "Coordinator" | "Mentor" | "Judge";
export type FoodType = "Veg" | "Non Veg";
