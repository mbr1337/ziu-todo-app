import { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1Data } from '../../utils/schemas';

type Props = {
  onComplete: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
  externalEmailError?: string;
};

const getPasswordStrength = (pwd: string): { label: string; value: number; color: 'error' | 'warning' | 'success' } => {
  if (!pwd) return { label: 'słabe', value: 33, color: 'error' };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: 'słabe', value: 33, color: 'error' };
  if (score <= 3) return { label: 'średnie', value: 66, color: 'warning' };
  return { label: 'silne', value: 100, color: 'success' };
};

const Step1 = ({ onComplete, defaultValues, externalEmailError }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (externalEmailError) {
      setError('email', { type: 'server', message: externalEmailError });
    }
  }, [externalEmailError, setError]);

  const passwordValue = watch('password');
  const strength = getPasswordStrength(passwordValue ?? '');

  return (
    <Box component="form" onSubmit={handleSubmit(onComplete)} noValidate>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        * Pola wymagane
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.firstName}>
                <InputLabel htmlFor="firstName" required>
                  Imię
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="firstName"
                  label="Imię"
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'firstName-err' : undefined}
                />
                {errors.firstName && (
                  <FormHelperText id="firstName-err" role="alert">
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.lastName}>
                <InputLabel htmlFor="lastName" required>
                  Nazwisko
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="lastName"
                  label="Nazwisko"
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'lastName-err' : undefined}
                />
                {errors.lastName && (
                  <FormHelperText id="lastName-err" role="alert">
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.email}>
                <InputLabel htmlFor="email" required>
                  E-mail
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="email"
                  label="E-mail"
                  type="email"
                  aria-required="true"
                  autoComplete='email'
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-err' : undefined}
                />
                {errors.email && (
                  <FormHelperText id="email-err" role="alert">
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.password}>
                <InputLabel htmlFor="password" required>
                  Hasło
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="password"
                  label="Hasło"
                  type="password"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'pwd-err' : 'pwd-hint'}
                  autoComplete='new-password'
                />
                <Box sx={{ mt: 0.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={passwordValue ? strength.value : 0}
                    color={strength.color}
                    aria-hidden="true"
                    sx={{ borderRadius: 1, height: 6 }}
                  />
                  <span id="pwd-hint" aria-live="polite">
                    <Typography variant="caption" color={`${strength.color}.main`}>
                      {passwordValue ? `Siła hasła: ${strength.label}` : ''}
                    </Typography>
                  </span>
                </Box>
                {errors.password && (
                  <FormHelperText id="pwd-err" role="alert">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.confirmPassword}>
                <InputLabel htmlFor="confirmPassword" required>
                  Potwierdź hasło
                </InputLabel>
                <OutlinedInput
                  {...field}
                  id="confirmPassword"
                  label="Potwierdź hasło"
                  type="password"
                  aria-required="true"
                  aria-invalid={!!errors.confirmPassword}
                  autoComplete='new-password'
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-err' : undefined}
                />
                {errors.confirmPassword && (
                  <FormHelperText id="confirmPassword-err" role="alert">
                    {errors.confirmPassword.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained">
          Dalej →
        </Button>
      </Box>
    </Box>
  );
};

export default Step1;
