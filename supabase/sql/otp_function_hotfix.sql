DROP FUNCTION IF EXISTS generate_password_reset_otp(TEXT);
DROP FUNCTION IF EXISTS verify_otp_and_reset_password(TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS verify_otp_code(TEXT, TEXT);

CREATE OR REPLACE FUNCTION generate_password_reset_otp(p_user_email TEXT)
RETURNS JSON AS $$
DECLARE
    user_record RECORD;
    generated_otp_code TEXT;
    existing_otp RECORD;
BEGIN
    SELECT * INTO user_record
    FROM auth.users
    WHERE email = p_user_email;

    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'message', 'User not found with this email address'
        );
    END IF;

    SELECT * INTO existing_otp
    FROM public.otp_password_reset
    WHERE otp_password_reset.user_email = p_user_email
      AND expires_at > NOW()
      AND used = false
    ORDER BY created_at DESC
    LIMIT 1;

    IF existing_otp.id IS NOT NULL AND existing_otp.created_at > (NOW() - INTERVAL '2 minutes') THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Un code OTP a deja ete envoye recemment. Veuillez attendre avant d''en demander un nouveau.'
        );
    END IF;

    generated_otp_code := LPAD((random() * 999999)::int::text, 6, '0');

    UPDATE public.otp_password_reset
    SET used = true, used_at = NOW()
    WHERE otp_password_reset.user_email = p_user_email
      AND used = false;

    INSERT INTO public.otp_password_reset (
        user_id,
        user_email,
        otp_code,
        expires_at
    ) VALUES (
        user_record.id,
        p_user_email,
        generated_otp_code,
        NOW() + INTERVAL '10 minutes'
    );

    RETURN json_build_object(
        'success', true,
        'message', 'Code OTP genere avec succes',
        'otp_code', generated_otp_code,
        'user_email', p_user_email,
        'expires_at', (NOW() + INTERVAL '10 minutes')::text
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Une erreur est survenue lors de la generation du code OTP: ' || SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION verify_otp_and_reset_password(
    p_user_email TEXT,
    p_otp_code TEXT,
    p_new_password TEXT
)
RETURNS JSON AS $$
DECLARE
    otp_record RECORD;
    user_record RECORD;
BEGIN
    SELECT * INTO otp_record
    FROM public.otp_password_reset
    WHERE otp_password_reset.user_email = p_user_email
      AND otp_password_reset.otp_code = p_otp_code
      AND expires_at > NOW()
      AND used = false
    ORDER BY created_at DESC
    LIMIT 1;

    IF NOT FOUND THEN
        UPDATE public.otp_password_reset
        SET attempts = attempts + 1
        WHERE otp_password_reset.user_email = p_user_email
          AND expires_at > NOW()
          AND used = false;

        RETURN json_build_object(
            'success', false,
            'message', 'Code OTP invalide ou expire'
        );
    END IF;

    IF otp_record.attempts >= otp_record.max_attempts THEN
        UPDATE public.otp_password_reset
        SET used = true, used_at = NOW()
        WHERE id = otp_record.id;

        RETURN json_build_object(
            'success', false,
            'message', 'Nombre maximum de tentatives depasse. Veuillez demander un nouveau code OTP.'
        );
    END IF;

    SELECT * INTO user_record
    FROM auth.users
    WHERE email = p_user_email;

    IF NOT FOUND THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Utilisateur non trouve'
        );
    END IF;

    UPDATE auth.users
    SET encrypted_password = crypt(p_new_password, gen_salt('bf')),
        updated_at = NOW()
    WHERE email = p_user_email;

    UPDATE public.otp_password_reset
    SET used = true, used_at = NOW()
    WHERE id = otp_record.id;

    RETURN json_build_object(
        'success', true,
        'message', 'Mot de passe reinitialise avec succes'
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Une erreur est survenue lors de la reinitialisation: ' || SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION verify_otp_code(p_user_email TEXT, p_otp_code TEXT)
RETURNS JSON AS $$
DECLARE
    otp_record RECORD;
BEGIN
    SELECT * INTO otp_record
    FROM public.otp_password_reset
    WHERE otp_password_reset.user_email = p_user_email
      AND otp_password_reset.otp_code = p_otp_code
      AND expires_at > NOW()
      AND used = false
    ORDER BY created_at DESC
    LIMIT 1;

    IF NOT FOUND THEN
        UPDATE public.otp_password_reset
        SET attempts = attempts + 1
        WHERE otp_password_reset.user_email = p_user_email
          AND expires_at > NOW()
          AND used = false;

        RETURN json_build_object(
            'success', false,
            'message', 'Code OTP invalide ou expire'
        );
    END IF;

    IF otp_record.attempts >= otp_record.max_attempts THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Nombre maximum de tentatives depasse. Veuillez demander un nouveau code OTP.'
        );
    END IF;

    RETURN json_build_object(
        'success', true,
        'message', 'Code OTP valide',
        'otp_id', otp_record.id
    );
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'message', 'Une erreur est survenue lors de la verification: ' || SQLERRM
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION generate_password_reset_otp(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION verify_otp_and_reset_password(TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION verify_otp_code(TEXT, TEXT) TO anon, authenticated;
