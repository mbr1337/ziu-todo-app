import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step3Schema,
  type Step3Data,
  type Step1Data,
  type Step2Data,
} from "../../utils/schemas";

type Props = {
  step1Data: Step1Data;
  step2Data: Step2Data;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  serverError?: string;
};

const Step3 = ({
  step1Data,
  step2Data,
  onBack,
  onSubmit: onFinalSubmit,
  serverError,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: { rodo: false },
  });

  const onSubmit = async () => {
    await onFinalSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ bgcolor: "action.hover", p: 2, borderRadius: 1, mb: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Dane osobowe
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary="Imię i nazwisko"
              secondary={`${step1Data.firstName} ${step1Data.lastName}`}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="E-mail" secondary={step1Data.email} />
          </ListItem>
        </List>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Preferencje
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary="Kategorie"
              secondary={step2Data.categories.map((c) => c.value).join(", ")}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Powiadomienia e-mail"
              secondary={step2Data.notifications.email ? "Tak" : "Nie"}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Powiadomienia push"
              secondary={step2Data.notifications.push ? "Tak" : "Nie"}
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Newsletter"
              secondary={step2Data.newsletter ? "Tak" : "Nie"}
            />
          </ListItem>
        </List>
      </Box>

      <FormControl error={!!errors.rodo} fullWidth>
        <Controller
          name="rodo"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  id="rodo"
                  checked={field.value === true}
                  onChange={(e) => field.onChange(e.target.checked)}
                  slotProps={{ input: { ref: field.ref } }}
                  aria-required="true"
                  aria-invalid={!!errors.rodo}
                  aria-describedby={errors.rodo ? "rodo-err" : undefined}
                />
              }
              label="Akceptuję klauzulę RODO i warunki przetwarzania danych osobowych *"
            />
          )}
        />
        {errors.rodo && (
          <FormHelperText id="rodo-err" role="alert">
            {errors.rodo.message}
          </FormHelperText>
        )}
      </FormControl>

      {serverError && (
        <Alert
          severity="error"
          sx={{ mt: 2 }}
          role="alert"
          aria-live="assertive">
          {serverError}
        </Alert>
      )}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={onBack}
          variant="outlined"
          type="button"
          disabled={isSubmitting}>
          ← Wróć
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          aria-busy={isSubmitting}>
          {isSubmitting ? (
            <>
              <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
              Rejestrowanie...
            </>
          ) : (
            "Zarejestruj się"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Step3;
