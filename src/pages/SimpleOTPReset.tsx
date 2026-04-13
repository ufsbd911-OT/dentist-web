import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Shield } from 'lucide-react';

export default function SimpleOTPReset() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/reset-password-email', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Redirection en cours
          </CardTitle>
          <CardDescription>
            Nous vous redirigeons vers le parcours sécurisé de réinitialisation du mot de passe.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
}
