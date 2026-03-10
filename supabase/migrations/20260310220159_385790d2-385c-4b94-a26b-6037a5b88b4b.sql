
-- Create members table
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('Lead', 'Volunteer', 'Coordinator', 'Mentor', 'Judge')),
  food_type TEXT NOT NULL CHECK (food_type IN ('Veg', 'Non Veg')),
  day1_approved BOOLEAN NOT NULL DEFAULT false,
  day1_time TIMESTAMPTZ,
  day1_approved_by TEXT,
  day2_approved BOOLEAN NOT NULL DEFAULT false,
  day2_time TIMESTAMPTZ,
  day2_approved_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Since no auth, allow all operations for anon users (event system)
CREATE POLICY "Allow all read" ON public.members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.members FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.members FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Allow all delete" ON public.members FOR DELETE TO anon, authenticated USING (true);

-- Index for fast name search
CREATE INDEX idx_members_name_lower ON public.members (lower(name));
