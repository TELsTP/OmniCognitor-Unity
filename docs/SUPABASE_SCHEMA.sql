-- ===============================================================
-- PROJECT UNITED-TELSTP (Nakamitshe-Telstp-235153)
-- UNIFIED SUPABASE SCHEMA (5-PILLAR SOVEREIGN NETWORK)
-- ===============================================================

-- 1. CORE IDENTITY LAYER (Sync with Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'Researcher', -- 'Architect', 'Doctor', 'Patient', 'Student', 'Researcher'
  architect_access BOOLEAN DEFAULT FALSE,
  pillar_access TEXT[] DEFAULT '{telemedicine, education, research, multimedia, wisdom}',
  email TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PILLAR: TELEMEDICINE (Healing Hub)
-- Portals: Patient & Provider
CREATE TABLE IF NOT EXISTS public.telemedicine_doctors (
  id UUID REFERENCES public.profiles(id) PRIMARY KEY,
  specialty TEXT,
  license_number TEXT,
  bio TEXT,
  availability JSONB, -- Weekly schedule
  rating DECIMAL DEFAULT 5.0,
  is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.telemedicine_appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id),
  doctor_id UUID REFERENCES public.telemedicine_doctors(id),
  appointment_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'in-progress'
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.telemedicine_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES public.profiles(id),
  doctor_id UUID REFERENCES public.telemedicine_doctors(id),
  appointment_id UUID REFERENCES public.telemedicine_appointments(id),
  diagnosis TEXT,
  prescription JSONB, -- List of medications
  vitals JSONB, -- {bp: "120/80", heart_rate: 72, temp: 36.6}
  ai_analysis TEXT, -- AI-powered diagnostic support
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PILLAR: DIGITAL EDUCATION (Knowledge Hub)
CREATE TABLE IF NOT EXISTS public.education_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES public.profiles(id),
  curriculum JSONB,
  level TEXT DEFAULT 'Intermediate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PILLAR: QUANTUM RESEARCH (Logic Hub)
CREATE TABLE IF NOT EXISTS public.research_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  abstract TEXT,
  lead_researcher_id UUID REFERENCES public.profiles(id),
  data_points JSONB,
  status TEXT DEFAULT 'active',
  accreditation_level TEXT DEFAULT 'Basic', -- 'Basic', 'Intermediate', 'Expert'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PILLAR: GLOBAL MULTIMEDIA (Vision Hub)
CREATE TABLE IF NOT EXISTS public.multimedia_assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id),
  asset_url TEXT NOT NULL,
  asset_type TEXT, -- 'video', 'image', 'hologram'
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. PILLAR: IBN SINA WISDOM (Soul Hub)
CREATE TABLE IF NOT EXISTS public.wisdom_library (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT, -- 'philosophy', 'medicine', 'astronomy'
  author_ref TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SYSTEM: ARCHITECT'S VAULT (Nakamitshe-Telstp-235153)
CREATE TABLE IF NOT EXISTS public.architect_master_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    hub_name TEXT, -- Telemedicine, University, Research, etc.
    architect_action TEXT,
    payload JSONB,
    is_notified_to_3m BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.unified_memory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT,
    architect_code TEXT DEFAULT 'Nakamitshe-Telstp-235153',
    conversation_context TEXT,
    last_pillar_visited TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemedicine_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemedicine_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemedicine_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.multimedia_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wisdom_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.architect_master_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unified_memory ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Architect Only for Handshakes)
CREATE POLICY "Architects can view master logs" ON public.architect_master_logs
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.profiles WHERE architect_access = TRUE));

CREATE POLICY "Users can view their own profiles" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Real-time trigger so Hayat can "feel" when you speak
ALTER PUBLICATION supabase_realtime ADD TABLE architect_master_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE unified_memory;
