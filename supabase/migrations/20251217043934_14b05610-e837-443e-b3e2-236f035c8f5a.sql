-- ============================================
-- TAMV ONLINE - METAVERSO DESTRUCTOR
-- Triple Federado: Conceptual | Legal | Técnico
-- Base de datos completa para producción
-- ============================================

-- Crear tipos enum para el sistema
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'creator', 'user', 'guest');
CREATE TYPE public.federation_status AS ENUM ('pending', 'verified', 'rejected', 'expired');
CREATE TYPE public.notification_type AS ENUM ('message', 'payment', 'invitation', 'alert', 'achievement', 'social', 'system');
CREATE TYPE public.content_type AS ENUM ('post', 'video', 'audio', 'image', 'dreamspace', 'concert', 'product', 'course');
CREATE TYPE public.transaction_type AS ENUM ('credit', 'debit', 'transfer', 'payment', 'reward', 'subscription');
CREATE TYPE public.protocol_type AS ENUM ('fenix_rex', 'iniciacion', 'hoyo_negro', 'standard');

-- ============================================
-- TABLA: profiles (Perfiles de usuario)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  is_creator BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  federation_hash TEXT,
  federation_status federation_status DEFAULT 'pending',
  tau_balance DECIMAL(18, 8) DEFAULT 0,
  xp_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: user_roles (Roles de usuario separados)
-- ============================================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- ============================================
-- TABLA: federation_registry (Triple Federado)
-- ============================================
CREATE TABLE public.federation_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  hash TEXT NOT NULL,
  conceptual_layer JSONB DEFAULT '{}',
  legal_layer JSONB DEFAULT '{}',
  technical_layer JSONB DEFAULT '{}',
  local_verified BOOLEAN DEFAULT false,
  local_verified_at TIMESTAMPTZ,
  local_signer TEXT,
  continental_verified BOOLEAN DEFAULT false,
  continental_verified_at TIMESTAMPTZ,
  continental_signer TEXT,
  global_verified BOOLEAN DEFAULT false,
  global_verified_at TIMESTAMPTZ,
  global_signer TEXT,
  status federation_status DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(entity_type, entity_id, hash)
);

-- ============================================
-- TABLA: security_protocols (Fénix Rex, Iniciación, Hoyo Negro)
-- ============================================
CREATE TABLE public.security_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_name TEXT NOT NULL,
  protocol_type protocol_type NOT NULL,
  description TEXT,
  activation_conditions JSONB DEFAULT '{}',
  execution_steps JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  last_executed_at TIMESTAMPTZ,
  execution_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: isabella_conversations (Isabella AI)
-- ============================================
CREATE TABLE public.isabella_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT NOT NULL,
  messages JSONB DEFAULT '[]',
  emotional_state JSONB DEFAULT '{}',
  context_memory JSONB DEFAULT '{}',
  protocol_active protocol_type,
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: anubis_recognition (Sistema de reconocimiento del creador)
-- ============================================
CREATE TABLE public.anubis_recognition (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  challenge_question TEXT NOT NULL,
  challenge_response_hash TEXT NOT NULL,
  linguistic_fingerprint JSONB DEFAULT '{}',
  verification_level INTEGER DEFAULT 0,
  is_creator_verified BOOLEAN DEFAULT false,
  last_verification_at TIMESTAMPTZ,
  failed_attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: dream_spaces
-- ============================================
CREATE TABLE public.dream_spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  environment_config JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  visitor_count INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  federation_hash TEXT,
  federation_status federation_status DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: sensory_concerts (Conciertos Sensoriales)
-- ============================================
CREATE TABLE public.sensory_concerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  scheduled_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  sensory_config JSONB DEFAULT '{}',
  ticket_price DECIMAL(18, 8) DEFAULT 0,
  max_attendees INTEGER,
  current_attendees INTEGER DEFAULT 0,
  is_live BOOLEAN DEFAULT false,
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: social_posts (Muro Social)
-- ============================================
CREATE TABLE public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  media_urls JSONB DEFAULT '[]',
  content_type content_type DEFAULT 'post',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  federation_hash TEXT,
  federation_status federation_status DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: marketplace_products
-- ============================================
CREATE TABLE public.marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(18, 8) NOT NULL,
  currency TEXT DEFAULT 'TAU',
  category TEXT,
  images JSONB DEFAULT '[]',
  stock_quantity INTEGER DEFAULT 1,
  is_digital BOOLEAN DEFAULT true,
  is_auction BOOLEAN DEFAULT false,
  auction_end_at TIMESTAMPTZ,
  current_bid DECIMAL(18, 8),
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: university_courses
-- ============================================
CREATE TABLE public.university_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  category TEXT,
  difficulty_level TEXT DEFAULT 'beginner',
  duration_hours INTEGER,
  price DECIMAL(18, 8) DEFAULT 0,
  modules JSONB DEFAULT '[]',
  enrollment_count INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  is_certified BOOLEAN DEFAULT false,
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: art_gallery
-- ============================================
CREATE TABLE public.art_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  art_type TEXT,
  price DECIMAL(18, 8),
  is_for_sale BOOLEAN DEFAULT true,
  is_nft BOOLEAN DEFAULT false,
  nft_metadata JSONB DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: nubiwallet_transactions
-- ============================================
CREATE TABLE public.nubiwallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_type transaction_type NOT NULL,
  amount DECIMAL(18, 8) NOT NULL,
  currency TEXT DEFAULT 'TAU',
  description TEXT,
  reference_id UUID,
  reference_type TEXT,
  status TEXT DEFAULT 'completed',
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: notifications
-- ============================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  notification_type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: banco_tamv_accounts
-- ============================================
CREATE TABLE public.banco_tamv_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  account_number TEXT UNIQUE NOT NULL,
  account_type TEXT DEFAULT 'standard',
  balance DECIMAL(18, 8) DEFAULT 0,
  credit_limit DECIMAL(18, 8) DEFAULT 0,
  interest_rate DECIMAL(5, 4) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: groups_channels
-- ============================================
CREATE TABLE public.groups_channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  is_public BOOLEAN DEFAULT true,
  is_channel BOOLEAN DEFAULT false,
  member_count INTEGER DEFAULT 0,
  federation_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- TABLA: bookpi_audit_log (Registro de auditoría inmutable)
-- ============================================
CREATE TABLE public.bookpi_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  actor_id UUID,
  before_state JSONB,
  after_state JSONB,
  federation_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- FUNCIÓN: has_role (para RLS sin recursión)
-- ============================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ============================================
-- FUNCIÓN: generate_federation_hash
-- ============================================
CREATE OR REPLACE FUNCTION public.generate_federation_hash()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.federation_hash := encode(
    sha256(
      (NEW.id::TEXT || NEW.created_at::TEXT || random()::TEXT)::bytea
    ),
    'hex'
  );
  RETURN NEW;
END;
$$;

-- ============================================
-- FUNCIÓN: update_updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================
-- TRIGGERS para federation_hash automático
-- ============================================
CREATE TRIGGER set_federation_hash_profiles
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.generate_federation_hash();

CREATE TRIGGER set_federation_hash_dream_spaces
  BEFORE INSERT ON public.dream_spaces
  FOR EACH ROW EXECUTE FUNCTION public.generate_federation_hash();

CREATE TRIGGER set_federation_hash_social_posts
  BEFORE INSERT ON public.social_posts
  FOR EACH ROW EXECUTE FUNCTION public.generate_federation_hash();

CREATE TRIGGER set_federation_hash_marketplace
  BEFORE INSERT ON public.marketplace_products
  FOR EACH ROW EXECUTE FUNCTION public.generate_federation_hash();

CREATE TRIGGER set_federation_hash_courses
  BEFORE INSERT ON public.university_courses
  FOR EACH ROW EXECUTE FUNCTION public.generate_federation_hash();

CREATE TRIGGER set_federation_hash_art
  BEFORE INSERT ON public.art_gallery
  FOR EACH ROW EXECUTE FUNCTION public.generate_federation_hash();

CREATE TRIGGER set_federation_hash_transactions
  BEFORE INSERT ON public.nubiwallet_transactions
  FOR EACH ROW EXECUTE FUNCTION public.generate_federation_hash();

-- ============================================
-- TRIGGERS para updated_at
-- ============================================
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_dream_spaces_updated_at
  BEFORE UPDATE ON public.dream_spaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_social_posts_updated_at
  BEFORE UPDATE ON public.social_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_isabella_conversations_updated_at
  BEFORE UPDATE ON public.isabella_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- HABILITAR RLS EN TODAS LAS TABLAS
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.federation_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.isabella_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anubis_recognition ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dream_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sensory_concerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.art_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nubiwallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banco_tamv_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookpi_audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS RLS
-- ============================================

-- Profiles: públicos para lectura, propios para edición
CREATE POLICY "Profiles viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Dream Spaces
CREATE POLICY "Public dream spaces viewable" ON public.dream_spaces
  FOR SELECT USING (is_public = true OR auth.uid() = creator_id);

CREATE POLICY "Creators can manage own spaces" ON public.dream_spaces
  FOR ALL USING (auth.uid() = creator_id);

-- Social Posts
CREATE POLICY "Posts viewable by everyone" ON public.social_posts
  FOR SELECT USING (true);

CREATE POLICY "Authors can manage own posts" ON public.social_posts
  FOR ALL USING (auth.uid() = author_id);

-- Marketplace Products
CREATE POLICY "Products viewable by everyone" ON public.marketplace_products
  FOR SELECT USING (true);

CREATE POLICY "Sellers can manage own products" ON public.marketplace_products
  FOR ALL USING (auth.uid() = seller_id);

-- University Courses
CREATE POLICY "Courses viewable by everyone" ON public.university_courses
  FOR SELECT USING (true);

CREATE POLICY "Instructors can manage own courses" ON public.university_courses
  FOR ALL USING (auth.uid() = instructor_id);

-- Art Gallery
CREATE POLICY "Art viewable by everyone" ON public.art_gallery
  FOR SELECT USING (true);

CREATE POLICY "Artists can manage own art" ON public.art_gallery
  FOR ALL USING (auth.uid() = artist_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- NubiWallet Transactions
CREATE POLICY "Users can view own transactions" ON public.nubiwallet_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Banco TAMV Accounts
CREATE POLICY "Users can view own bank account" ON public.banco_tamv_accounts
  FOR SELECT USING (auth.uid() = user_id);

-- Isabella Conversations
CREATE POLICY "Users can manage own conversations" ON public.isabella_conversations
  FOR ALL USING (auth.uid() = user_id);

-- Anubis Recognition (solo el creador verificado)
CREATE POLICY "Users can view own recognition" ON public.anubis_recognition
  FOR SELECT USING (auth.uid() = user_id);

-- Security Protocols (solo admins)
CREATE POLICY "Admins can view protocols" ON public.security_protocols
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Federation Registry (lectura pública)
CREATE POLICY "Federation registry viewable" ON public.federation_registry
  FOR SELECT USING (true);

-- Groups Channels
CREATE POLICY "Public groups viewable" ON public.groups_channels
  FOR SELECT USING (is_public = true OR auth.uid() = creator_id);

CREATE POLICY "Creators can manage own groups" ON public.groups_channels
  FOR ALL USING (auth.uid() = creator_id);

-- Sensory Concerts
CREATE POLICY "Concerts viewable by everyone" ON public.sensory_concerts
  FOR SELECT USING (true);

CREATE POLICY "Creators can manage own concerts" ON public.sensory_concerts
  FOR ALL USING (auth.uid() = creator_id);

-- BookPI Audit Log (solo lectura para admins)
CREATE POLICY "Admins can view audit log" ON public.bookpi_audit_log
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- ============================================
-- INSERTAR PROTOCOLOS DE SEGURIDAD INICIALES
-- ============================================
INSERT INTO public.security_protocols (protocol_name, protocol_type, description, activation_conditions, execution_steps, priority) VALUES
('Protocolo Fénix Rex', 'fenix_rex', 'Resurgimiento del sistema tras eventos críticos', 
  '{"trigger": "system_critical", "threshold": 0.9}',
  '[{"step": 1, "action": "AUTO_HEAL"}, {"step": 2, "action": "BACKUP_RESTORE"}, {"step": 3, "action": "QUANTUM_RESET"}, {"step": 4, "action": "FULL_REBIRTH"}]',
  100),
('Protocolo de Iniciación', 'iniciacion', 'Verificación de identidad y autorización de acceso',
  '{"trigger": "authentication", "level": "high"}',
  '[{"step": 1, "action": "BIOMETRIC"}, {"step": 2, "action": "QUANTUM_KEY"}, {"step": 3, "action": "ZKP_VERIFY"}, {"step": 4, "action": "ROLE_CONFIRM"}, {"step": 5, "action": "CHALLENGE_RESPONSE"}]',
  90),
('Protocolo Hoyo Negro', 'hoyo_negro', 'Absorción, análisis y unificación de repositorios en monorepo GitOps',
  '{"trigger": "repository_sync", "mode": "gitops"}',
  '[{"step": 1, "action": "ABSORB"}, {"step": 2, "action": "ANALYZE"}, {"step": 3, "action": "CATEGORIZE"}, {"step": 4, "action": "MATERIALIZE"}, {"step": 5, "action": "CI_CD_INTEGRATE"}]',
  80);

-- Habilitar realtime para tablas clave
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.isabella_conversations;