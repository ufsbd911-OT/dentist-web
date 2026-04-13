import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/integrations/supabase/client';

const OTP_PASSWORD_RESET_URL = `${SUPABASE_URL}/functions/v1/otp-password-reset`;

interface OTPPasswordResetResponse {
  success: boolean;
  error?: string;
  message?: string;
  expires_at?: string;
}

export async function requestOtpPasswordReset(email: string): Promise<OTPPasswordResetResponse> {
  const response = await fetch(OTP_PASSWORD_RESET_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ email }),
  });

  let result: OTPPasswordResetResponse;

  try {
    result = await response.json();
  } catch {
    result = {
      success: false,
      error: 'Réponse invalide du serveur.',
    };
  }

  if (!response.ok && result.success) {
    return {
      success: false,
      error: 'Erreur lors de l’envoi du code OTP.',
    };
  }

  return result;
}
