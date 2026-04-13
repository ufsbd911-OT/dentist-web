import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { AlertCircle, RefreshCw, Mail } from 'lucide-react';
import { requestOtpPasswordReset } from '@/lib/otp-password-reset';

export default function PasswordResetEmail() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Veuillez saisir votre adresse email.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const normalizedEmail = email.trim();
      const result = await requestOtpPasswordReset(normalizedEmail);

      if (!result.success) {
        setError(result.error || 'Erreur lors de l\'envoi du code OTP.');
        return;
      }

      toast({
        title: "Code OTP envoyé !",
        description: "Vérifiez votre boîte mail pour recevoir votre code de vérification à 6 chiffres.",
      });

      // Redirect to OTP verification page with email
      navigate(`/verify-otp?email=${encodeURIComponent(normalizedEmail)}&expires=${encodeURIComponent(result.expires_at || '')}`);

    } catch (error: any) {
      console.error('OTP sending error:', error);
      setError('Une erreur est survenue lors de l\'envoi du code OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Réinitialiser le mot de passe
          </CardTitle>
          <CardDescription>
            Entrez votre adresse email pour recevoir un code de vérification
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@example.com"
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer le code OTP
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/auth')}
              className="text-sm"
              disabled={loading}
            >
              Retour à la connexion
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
