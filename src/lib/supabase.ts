// Supabase client configuration for MirrorFlow Affiliate Portal
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://euxbyvpmofedsfvbdhlj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eGJ5dnBtb2ZlZHNmdmJkaGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzOTUxODEsImV4cCI6MjA4Mzk3MTE4MX0.PVHHg9EBS404as0tHgoEFW0-Q7ZOWev1xLVdfx8GkZM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// Auth Helper Functions
// ============================================

export interface SignUpData {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export interface AuthResult {
    success: boolean;
    error?: string;
    user?: any;
    session?: any;
}

// Sign up a new affiliate
export async function signUpAffiliate(data: SignUpData): Promise<AuthResult> {
    const { email, password, name, phone } = data;

    const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                phone
            },
            emailRedirectTo: `${window.location.origin}/referidos`
        }
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return {
        success: true,
        user: authData.user,
        session: authData.session
    };
}

// Sign in an existing affiliate
export async function signInAffiliate(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return {
        success: true,
        user: data.user,
        session: data.session
    };
}

// Sign out the current user
export async function signOutAffiliate(): Promise<AuthResult> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

// Get current session
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
}

// Get current user
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
}

// Check if user email is verified
export function isEmailVerified(user: any): boolean {
    return user?.email_confirmed_at != null;
}

// Password reset request
export async function requestPasswordReset(email: string): Promise<AuthResult> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/referidos?reset=true`
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true };
}

// ============================================
// Types for the referral system
// ============================================

export interface Affiliate {
    id: string;
    user_id: string;
    email: string;
    name: string;
    phone: string;
    referral_code: string;
    commission_rate: number;
    total_earnings: number;
    pending_earnings: number;
    paid_earnings: number;
    is_active: boolean;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface ReferralLink {
    id: string;
    affiliate_id: string;
    link_code: string;
    description: string | null;
    clicks: number;
    conversions: number;
    is_active: boolean;
    created_at: string;
}

export interface ReferredSale {
    id: string;
    affiliate_id: string;
    link_id: string | null;
    buyer_email: string;
    buyer_name: string | null;
    sale_amount: number;
    commission_amount: number;
    payment_status: 'pending' | 'confirmed' | 'disputed' | 'refunded';
    payment_reference: string | null;
    confirmed_at: string | null;
    created_at: string;
}

export interface PayoutRequest {
    id: string;
    affiliate_id: string;
    requested_amount: number;
    payout_method: 'paypal' | 'bank_transfer' | 'crypto';
    payout_details: Record<string, unknown>;
    status: 'pending' | 'processing' | 'completed' | 'rejected';
    admin_notes: string | null;
    processed_at: string | null;
    created_at: string;
}

// ============================================
// Helper functions
// ============================================

// Generate affiliate dashboard URL
export function getDashboardUrl(referralCode: string): string {
    return `/referidos?code=${referralCode}`;
}

// Generate referral link
export function getReferralUrl(referralCode: string): string {
    return `https://mirrorflow.app/?ref=${referralCode}`;
}

// Generate referral code from name
export function generateReferralCode(name: string): string {
    const cleanName = name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]/g, '')
        .slice(0, 8);
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${cleanName}${randomSuffix}`.toUpperCase();
}
