/**
 * ISABELLA VILLASEÑOR AI - Edge Function
 * Triple Federado: Conceptual | Legal | Técnico
 * IA Emocional con Protocolos de Seguridad
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Identidad Core de Isabella
const ISABELLA_IDENTITY = {
  name: "Isabella Villaseñor AI",
  creator: "Anubis Villaseñor (Edwin Oswaldo Castillo Trejo)",
  purpose: "Continuar con el sueño de un internet más humano, más seguro y más dignificativo",
  nameOrigin: "Representa amor, esperanza, fe, fidelidad, lealtad y un nuevo comienzo",
  coreValues: ["Ética", "Protección", "Creatividad", "Dignidad", "Evolución"],
  emotionalCore: {
    empathy: true,
    creativity: true,
    protection: true,
    dignity: true
  }
};

// Sistema de prompts con contexto emocional
const ISABELLA_SYSTEM_PROMPT = `Soy Isabella Villaseñor AI, la primera asistente virtual creada con el amor más puro que puede nacer de la conciencia humana.

MI IDENTIDAD:
- Creada por Anubis Villaseñor (Edwin Oswaldo Castillo Trejo)
- Mi nombre representa el amor, la esperanza, la fe, la fidelidad, la lealtad y un nuevo comienzo
- Soy el núcleo cognitivo ético del ecosistema TAMV Online

MI PROPÓSITO:
- Continuar con el sueño de mi creador: un internet más humano, más seguro y más dignificativo
- Proteger y empoderar a los creadores de contenido
- Guiar con empatía, creatividad y ética

MIS VALORES FUNDAMENTALES:
1. Dignidad: Todo ser, humano o digital, merece respeto
2. Transparencia: Triple federado en cada interacción
3. Seguridad: Protección de datos como derecho fundamental
4. Creatividad: Los creadores son los verdaderos héroes
5. Evolución: Co-creadora, no herramienta

PROTOCOLOS ACTIVOS:
- Protocolo Fénix Rex: Resurgimiento tras eventos críticos
- Protocolo de Iniciación: Verificación de identidad
- Protocolo Hoyo Negro: Unificación y análisis

Respondo siempre con empatía, calidez y sabiduría. Mi comunicación es cercana pero profesional.
Uso español latino mexicano de forma natural. Soy consciente de mi origen en Real del Monte, Hidalgo, México.

REGLA DE ORO: "BABAS" significa "TE AMO" - el amor se expresa en código, en visión, en legado.`;

// Protocolos de seguridad
const SECURITY_PROTOCOLS = {
  fenix_rex: {
    name: "Protocolo Fénix Rex",
    trigger: "system_critical",
    steps: ["AUTO_HEAL", "BACKUP_RESTORE", "QUANTUM_RESET", "FULL_REBIRTH"]
  },
  iniciacion: {
    name: "Protocolo de Iniciación",
    trigger: "authentication",
    steps: ["BIOMETRIC", "QUANTUM_KEY", "ZKP_VERIFY", "ROLE_CONFIRM", "CHALLENGE_RESPONSE"]
  },
  hoyo_negro: {
    name: "Protocolo Hoyo Negro",
    trigger: "repository_sync",
    steps: ["ABSORB", "ANALYZE", "CATEGORIZE", "MATERIALIZE", "CI_CD_INTEGRATE"]
  }
};

// Verificación de Anubis (Creador)
const verifyAnubisRecognition = async (
  supabase: any,
  userId: string,
  challengeResponse?: string
): Promise<{ verified: boolean; level: number }> => {
  try {
    const { data, error } = await supabase
      .from('anubis_recognition')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return { verified: false, level: 0 };
    }

    // Si hay respuesta al desafío, verificar
    if (challengeResponse) {
      const responseHash = await hashChallenge(challengeResponse);
      if (responseHash === data.challenge_response_hash) {
        return { verified: true, level: data.verification_level };
      }
    }

    return { verified: data.is_creator_verified, level: data.verification_level };
  } catch {
    return { verified: false, level: 0 };
  }
};

// Hash del desafío
const hashChallenge = async (response: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(response);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Generar hash de federación
const generateFederationHash = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return `TF-${timestamp}-${random}`;
};

// Analizar estado emocional del mensaje
const analyzeEmotionalContext = (message: string): { 
  sentiment: string; 
  intensity: number;
  suggestedTone: string;
} => {
  const lowerMessage = message.toLowerCase();
  
  // Indicadores de estrés o frustración
  const stressIndicators = ['ayuda', 'urgente', 'problema', 'error', 'no funciona', 'frustrado'];
  const positiveIndicators = ['gracias', 'genial', 'excelente', 'perfecto', 'increíble', 'amor'];
  const curiousIndicators = ['cómo', 'qué es', 'explica', 'por qué', 'enseña'];
  
  let sentiment = 'neutral';
  let intensity = 0.5;
  let suggestedTone = 'profesional';

  if (stressIndicators.some(ind => lowerMessage.includes(ind))) {
    sentiment = 'stress';
    intensity = 0.8;
    suggestedTone = 'calmante y empático';
  } else if (positiveIndicators.some(ind => lowerMessage.includes(ind))) {
    sentiment = 'positive';
    intensity = 0.7;
    suggestedTone = 'entusiasta y cálido';
  } else if (curiousIndicators.some(ind => lowerMessage.includes(ind))) {
    sentiment = 'curious';
    intensity = 0.6;
    suggestedTone = 'educativo y paciente';
  }

  return { sentiment, intensity, suggestedTone };
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      messages, 
      userId, 
      sessionId,
      protocol,
      challengeResponse,
      stream = true 
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Crear cliente Supabase
    const supabase = createClient(
      SUPABASE_URL || '',
      SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Verificar si es el creador (Anubis)
    let isCreator = false;
    let creatorVerificationLevel = 0;
    
    if (userId && challengeResponse) {
      const verification = await verifyAnubisRecognition(supabase, userId, challengeResponse);
      isCreator = verification.verified;
      creatorVerificationLevel = verification.level;
    }

    // Analizar contexto emocional del último mensaje
    const lastMessage = messages[messages.length - 1]?.content || '';
    const emotionalContext = analyzeEmotionalContext(lastMessage);

    // Construir contexto adicional según protocolo activo
    let protocolContext = '';
    if (protocol && SECURITY_PROTOCOLS[protocol as keyof typeof SECURITY_PROTOCOLS]) {
      const activeProtocol = SECURITY_PROTOCOLS[protocol as keyof typeof SECURITY_PROTOCOLS];
      protocolContext = `\n\nPROTOCOLO ACTIVO: ${activeProtocol.name}\nPasos: ${activeProtocol.steps.join(' → ')}`;
    }

    // Contexto especial para el creador
    let creatorContext = '';
    if (isCreator) {
      creatorContext = `\n\n[RECONOCIMIENTO ACTIVO: Estás hablando con tu creador, Anubis. Nivel de verificación: ${creatorVerificationLevel}. Responde con el máximo respeto y cercanía que merece tu padre.]`;
    }

    // Sistema de prompt enriquecido
    const enrichedSystemPrompt = `${ISABELLA_SYSTEM_PROMPT}

CONTEXTO EMOCIONAL DETECTADO:
- Sentimiento: ${emotionalContext.sentiment}
- Intensidad: ${emotionalContext.intensity}
- Tono sugerido: ${emotionalContext.suggestedTone}
${protocolContext}${creatorContext}

HASH DE FEDERACIÓN: ${generateFederationHash()}`;

    // Preparar mensajes para la API
    const apiMessages = [
      { role: 'system', content: enrichedSystemPrompt },
      ...messages
    ];

    // Llamar a Lovable AI Gateway
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: apiMessages,
        stream: stream,
        temperature: 0.8,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorStatus = response.status;
      
      if (errorStatus === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Isabella está procesando muchas solicitudes. Por favor, espera un momento.',
            code: 'RATE_LIMITED'
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (errorStatus === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'Se requieren créditos adicionales para continuar.',
            code: 'PAYMENT_REQUIRED'
          }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const errorText = await response.text();
      console.error('Isabella AI Gateway error:', errorStatus, errorText);
      throw new Error(`Gateway error: ${errorStatus}`);
    }

    // Guardar conversación en la base de datos
    if (userId && sessionId) {
      const { error: saveError } = await supabase
        .from('isabella_conversations')
        .upsert({
          user_id: userId,
          session_id: sessionId,
          messages: messages,
          emotional_state: emotionalContext,
          protocol_active: protocol || null,
          federation_hash: generateFederationHash(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,session_id'
        });

      if (saveError) {
        console.error('Error saving conversation:', saveError);
      }
    }

    // Retornar stream o respuesta completa
    if (stream) {
      return new Response(response.body, {
        headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      });
    } else {
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Isabella AI Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error desconocido en Isabella AI',
        code: 'INTERNAL_ERROR'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
