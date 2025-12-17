export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      anubis_recognition: {
        Row: {
          challenge_question: string
          challenge_response_hash: string
          created_at: string
          failed_attempts: number | null
          id: string
          is_creator_verified: boolean | null
          last_verification_at: string | null
          linguistic_fingerprint: Json | null
          user_id: string
          verification_level: number | null
        }
        Insert: {
          challenge_question: string
          challenge_response_hash: string
          created_at?: string
          failed_attempts?: number | null
          id?: string
          is_creator_verified?: boolean | null
          last_verification_at?: string | null
          linguistic_fingerprint?: Json | null
          user_id: string
          verification_level?: number | null
        }
        Update: {
          challenge_question?: string
          challenge_response_hash?: string
          created_at?: string
          failed_attempts?: number | null
          id?: string
          is_creator_verified?: boolean | null
          last_verification_at?: string | null
          linguistic_fingerprint?: Json | null
          user_id?: string
          verification_level?: number | null
        }
        Relationships: []
      }
      art_gallery: {
        Row: {
          art_type: string | null
          artist_id: string
          created_at: string
          description: string | null
          federation_hash: string | null
          id: string
          image_url: string
          is_for_sale: boolean | null
          is_nft: boolean | null
          likes_count: number | null
          nft_metadata: Json | null
          price: number | null
          title: string
          views_count: number | null
        }
        Insert: {
          art_type?: string | null
          artist_id: string
          created_at?: string
          description?: string | null
          federation_hash?: string | null
          id?: string
          image_url: string
          is_for_sale?: boolean | null
          is_nft?: boolean | null
          likes_count?: number | null
          nft_metadata?: Json | null
          price?: number | null
          title: string
          views_count?: number | null
        }
        Update: {
          art_type?: string | null
          artist_id?: string
          created_at?: string
          description?: string | null
          federation_hash?: string | null
          id?: string
          image_url?: string
          is_for_sale?: boolean | null
          is_nft?: boolean | null
          likes_count?: number | null
          nft_metadata?: Json | null
          price?: number | null
          title?: string
          views_count?: number | null
        }
        Relationships: []
      }
      banco_tamv_accounts: {
        Row: {
          account_number: string
          account_type: string | null
          balance: number | null
          created_at: string
          credit_limit: number | null
          federation_hash: string | null
          id: string
          interest_rate: number | null
          is_active: boolean | null
          user_id: string
        }
        Insert: {
          account_number: string
          account_type?: string | null
          balance?: number | null
          created_at?: string
          credit_limit?: number | null
          federation_hash?: string | null
          id?: string
          interest_rate?: number | null
          is_active?: boolean | null
          user_id: string
        }
        Update: {
          account_number?: string
          account_type?: string | null
          balance?: number | null
          created_at?: string
          credit_limit?: number | null
          federation_hash?: string | null
          id?: string
          interest_rate?: number | null
          is_active?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      bookpi_audit_log: {
        Row: {
          action_type: string
          actor_id: string | null
          after_state: Json | null
          before_state: Json | null
          created_at: string
          entity_id: string
          entity_type: string
          federation_hash: string
          id: string
        }
        Insert: {
          action_type: string
          actor_id?: string | null
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string
          entity_id: string
          entity_type: string
          federation_hash: string
          id?: string
        }
        Update: {
          action_type?: string
          actor_id?: string | null
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          federation_hash?: string
          id?: string
        }
        Relationships: []
      }
      dream_spaces: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          environment_config: Json | null
          federation_hash: string | null
          federation_status:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          rating: number | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          visitor_count: number | null
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          environment_config?: Json | null
          federation_hash?: string | null
          federation_status?:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          rating?: number | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          visitor_count?: number | null
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          environment_config?: Json | null
          federation_hash?: string | null
          federation_status?:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          rating?: number | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          visitor_count?: number | null
        }
        Relationships: []
      }
      federation_registry: {
        Row: {
          conceptual_layer: Json | null
          continental_signer: string | null
          continental_verified: boolean | null
          continental_verified_at: string | null
          created_at: string
          entity_id: string
          entity_type: string
          global_signer: string | null
          global_verified: boolean | null
          global_verified_at: string | null
          hash: string
          id: string
          legal_layer: Json | null
          local_signer: string | null
          local_verified: boolean | null
          local_verified_at: string | null
          status: Database["public"]["Enums"]["federation_status"] | null
          technical_layer: Json | null
        }
        Insert: {
          conceptual_layer?: Json | null
          continental_signer?: string | null
          continental_verified?: boolean | null
          continental_verified_at?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          global_signer?: string | null
          global_verified?: boolean | null
          global_verified_at?: string | null
          hash: string
          id?: string
          legal_layer?: Json | null
          local_signer?: string | null
          local_verified?: boolean | null
          local_verified_at?: string | null
          status?: Database["public"]["Enums"]["federation_status"] | null
          technical_layer?: Json | null
        }
        Update: {
          conceptual_layer?: Json | null
          continental_signer?: string | null
          continental_verified?: boolean | null
          continental_verified_at?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          global_signer?: string | null
          global_verified?: boolean | null
          global_verified_at?: string | null
          hash?: string
          id?: string
          legal_layer?: Json | null
          local_signer?: string | null
          local_verified?: boolean | null
          local_verified_at?: string | null
          status?: Database["public"]["Enums"]["federation_status"] | null
          technical_layer?: Json | null
        }
        Relationships: []
      }
      groups_channels: {
        Row: {
          avatar_url: string | null
          created_at: string
          creator_id: string
          description: string | null
          federation_hash: string | null
          id: string
          is_channel: boolean | null
          is_public: boolean | null
          member_count: number | null
          name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          federation_hash?: string | null
          id?: string
          is_channel?: boolean | null
          is_public?: boolean | null
          member_count?: number | null
          name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          federation_hash?: string | null
          id?: string
          is_channel?: boolean | null
          is_public?: boolean | null
          member_count?: number | null
          name?: string
        }
        Relationships: []
      }
      isabella_conversations: {
        Row: {
          context_memory: Json | null
          created_at: string
          emotional_state: Json | null
          federation_hash: string | null
          id: string
          messages: Json | null
          protocol_active: Database["public"]["Enums"]["protocol_type"] | null
          session_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          context_memory?: Json | null
          created_at?: string
          emotional_state?: Json | null
          federation_hash?: string | null
          id?: string
          messages?: Json | null
          protocol_active?: Database["public"]["Enums"]["protocol_type"] | null
          session_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          context_memory?: Json | null
          created_at?: string
          emotional_state?: Json | null
          federation_hash?: string | null
          id?: string
          messages?: Json | null
          protocol_active?: Database["public"]["Enums"]["protocol_type"] | null
          session_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketplace_products: {
        Row: {
          auction_end_at: string | null
          category: string | null
          created_at: string
          currency: string | null
          current_bid: number | null
          description: string | null
          federation_hash: string | null
          id: string
          images: Json | null
          is_auction: boolean | null
          is_digital: boolean | null
          price: number
          seller_id: string
          stock_quantity: number | null
          title: string
        }
        Insert: {
          auction_end_at?: string | null
          category?: string | null
          created_at?: string
          currency?: string | null
          current_bid?: number | null
          description?: string | null
          federation_hash?: string | null
          id?: string
          images?: Json | null
          is_auction?: boolean | null
          is_digital?: boolean | null
          price: number
          seller_id: string
          stock_quantity?: number | null
          title: string
        }
        Update: {
          auction_end_at?: string | null
          category?: string | null
          created_at?: string
          currency?: string | null
          current_bid?: number | null
          description?: string | null
          federation_hash?: string | null
          id?: string
          images?: Json | null
          is_auction?: boolean | null
          is_digital?: boolean | null
          price?: number
          seller_id?: string
          stock_quantity?: number | null
          title?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          is_read: boolean | null
          message: string | null
          notification_type: Database["public"]["Enums"]["notification_type"]
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          notification_type: Database["public"]["Enums"]["notification_type"]
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          notification_type?: Database["public"]["Enums"]["notification_type"]
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      nubiwallet_transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          description: string | null
          federation_hash: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          status: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          description?: string | null
          federation_hash?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          description?: string | null
          federation_hash?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          status?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          federation_hash: string | null
          federation_status:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id: string
          is_creator: boolean | null
          is_verified: boolean | null
          level: number | null
          location: string | null
          tau_balance: number | null
          updated_at: string
          user_id: string
          username: string
          website: string | null
          xp_points: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          federation_hash?: string | null
          federation_status?:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id?: string
          is_creator?: boolean | null
          is_verified?: boolean | null
          level?: number | null
          location?: string | null
          tau_balance?: number | null
          updated_at?: string
          user_id: string
          username: string
          website?: string | null
          xp_points?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          federation_hash?: string | null
          federation_status?:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id?: string
          is_creator?: boolean | null
          is_verified?: boolean | null
          level?: number | null
          location?: string | null
          tau_balance?: number | null
          updated_at?: string
          user_id?: string
          username?: string
          website?: string | null
          xp_points?: number | null
        }
        Relationships: []
      }
      security_protocols: {
        Row: {
          activation_conditions: Json | null
          created_at: string
          description: string | null
          execution_count: number | null
          execution_steps: Json | null
          id: string
          is_active: boolean | null
          last_executed_at: string | null
          priority: number | null
          protocol_name: string
          protocol_type: Database["public"]["Enums"]["protocol_type"]
        }
        Insert: {
          activation_conditions?: Json | null
          created_at?: string
          description?: string | null
          execution_count?: number | null
          execution_steps?: Json | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          priority?: number | null
          protocol_name: string
          protocol_type: Database["public"]["Enums"]["protocol_type"]
        }
        Update: {
          activation_conditions?: Json | null
          created_at?: string
          description?: string | null
          execution_count?: number | null
          execution_steps?: Json | null
          id?: string
          is_active?: boolean | null
          last_executed_at?: string | null
          priority?: number | null
          protocol_name?: string
          protocol_type?: Database["public"]["Enums"]["protocol_type"]
        }
        Relationships: []
      }
      sensory_concerts: {
        Row: {
          created_at: string
          creator_id: string
          current_attendees: number | null
          description: string | null
          duration_minutes: number | null
          federation_hash: string | null
          id: string
          is_live: boolean | null
          max_attendees: number | null
          scheduled_at: string | null
          sensory_config: Json | null
          thumbnail_url: string | null
          ticket_price: number | null
          title: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          current_attendees?: number | null
          description?: string | null
          duration_minutes?: number | null
          federation_hash?: string | null
          id?: string
          is_live?: boolean | null
          max_attendees?: number | null
          scheduled_at?: string | null
          sensory_config?: Json | null
          thumbnail_url?: string | null
          ticket_price?: number | null
          title: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          current_attendees?: number | null
          description?: string | null
          duration_minutes?: number | null
          federation_hash?: string | null
          id?: string
          is_live?: boolean | null
          max_attendees?: number | null
          scheduled_at?: string | null
          sensory_config?: Json | null
          thumbnail_url?: string | null
          ticket_price?: number | null
          title?: string
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          author_id: string
          comments_count: number | null
          content: string
          content_type: Database["public"]["Enums"]["content_type"] | null
          created_at: string
          federation_hash: string | null
          federation_status:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id: string
          is_featured: boolean | null
          likes_count: number | null
          media_urls: Json | null
          shares_count: number | null
          updated_at: string
        }
        Insert: {
          author_id: string
          comments_count?: number | null
          content: string
          content_type?: Database["public"]["Enums"]["content_type"] | null
          created_at?: string
          federation_hash?: string | null
          federation_status?:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          media_urls?: Json | null
          shares_count?: number | null
          updated_at?: string
        }
        Update: {
          author_id?: string
          comments_count?: number | null
          content?: string
          content_type?: Database["public"]["Enums"]["content_type"] | null
          created_at?: string
          federation_hash?: string | null
          federation_status?:
            | Database["public"]["Enums"]["federation_status"]
            | null
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          media_urls?: Json | null
          shares_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      university_courses: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration_hours: number | null
          enrollment_count: number | null
          federation_hash: string | null
          id: string
          instructor_id: string
          is_certified: boolean | null
          modules: Json | null
          price: number | null
          rating: number | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          enrollment_count?: number | null
          federation_hash?: string | null
          id?: string
          instructor_id: string
          is_certified?: boolean | null
          modules?: Json | null
          price?: number | null
          rating?: number | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          enrollment_count?: number | null
          federation_hash?: string | null
          id?: string
          instructor_id?: string
          is_certified?: boolean | null
          modules?: Json | null
          price?: number | null
          rating?: number | null
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "creator" | "user" | "guest"
      content_type:
        | "post"
        | "video"
        | "audio"
        | "image"
        | "dreamspace"
        | "concert"
        | "product"
        | "course"
      federation_status: "pending" | "verified" | "rejected" | "expired"
      notification_type:
        | "message"
        | "payment"
        | "invitation"
        | "alert"
        | "achievement"
        | "social"
        | "system"
      protocol_type: "fenix_rex" | "iniciacion" | "hoyo_negro" | "standard"
      transaction_type:
        | "credit"
        | "debit"
        | "transfer"
        | "payment"
        | "reward"
        | "subscription"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "creator", "user", "guest"],
      content_type: [
        "post",
        "video",
        "audio",
        "image",
        "dreamspace",
        "concert",
        "product",
        "course",
      ],
      federation_status: ["pending", "verified", "rejected", "expired"],
      notification_type: [
        "message",
        "payment",
        "invitation",
        "alert",
        "achievement",
        "social",
        "system",
      ],
      protocol_type: ["fenix_rex", "iniciacion", "hoyo_negro", "standard"],
      transaction_type: [
        "credit",
        "debit",
        "transfer",
        "payment",
        "reward",
        "subscription",
      ],
    },
  },
} as const
