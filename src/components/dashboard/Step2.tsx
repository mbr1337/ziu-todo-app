import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2Data } from "../../utils/schemas";

type Props = {
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2Data>;
};

const Step2 = ({ onComplete, onBack, defaultValues }: Props) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      categories: [{ value: "" }],
      notifications: { email: false, push: false },
      newsletter: false,
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const categoriesRootError =
    (errors.categories as { root?: { message?: string } } | undefined)?.root
      ?.message ??
    (errors.categories as { message?: string } | undefined)?.message;

  return (
    <Box component="form" onSubmit={handleSubmit(onComplete)} noValidate>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        * Pola wymagane
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box component="fieldset" sx={{ border: "none", p: 0, m: 0 }}>
            <Typography component="legend" variant="subtitle1" gutterBottom>
              Kategorie *
            </Typography>
            {fields.map((field, index) => (
              <Box key={field.id} sx={{ display: "flex", gap: 1, mb: 1 }}>
                <FormControl
                  fullWidth
                  error={!!errors.categories?.[index]?.value}>
                  <InputLabel htmlFor={`category-${index}`}>
                    Kategoria {index + 1}
                  </InputLabel>
                  <OutlinedInput
                    id={`category-${index}`}
                    label={`Kategoria ${index + 1}`}
                    aria-required={index === 0 ? "true" : "false"}
                    aria-invalid={!!errors.categories?.[index]?.value}
                    aria-describedby={
                      errors.categories?.[index]?.value
                        ? `cat-err-${index}`
                        : undefined
                    }
                    {...register(`categories.${index}.value`)}
                  />
                  {errors.categories?.[index]?.value && (
                    <FormHelperText id={`cat-err-${index}`} role="alert">
                      {errors.categories[index].value?.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <IconButton
                  onClick={() => remove(index)}
                  aria-label={`Usuń kategorię ${index + 1}`}
                  color="error"
                  disabled={fields.length === 1}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {categoriesRootError && (
              <FormHelperText error role="alert">
                {categoriesRootError}
              </FormHelperText>
            )}
            <Button
              startIcon={<AddIcon />}
              onClick={() => append({ value: "" })}
              type="button"
              variant="outlined"
              size="small"
              sx={{ mt: 0.5 }}>
              Dodaj kategorię
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box component="fieldset" sx={{ border: "none", p: 0, m: 0 }}>
            <Typography component="legend" variant="subtitle1" gutterBottom>
              Powiadomienia
            </Typography>
            <Controller
              name="notifications.email"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      id="notif-email"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      inputRef={field.ref}
                      aria-label="Powiadomienia e-mail"
                    />
                  }
                  label="Powiadomienia e-mail"
                />
              )}
            />
            <Controller
              name="notifications.push"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      id="notif-push"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      slotProps={{ input: { ref: field.ref } }}
                      aria-label="Powiadomienia push"
                    />
                  }
                  label="Powiadomienia push"
                />
              )}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    id="newsletter"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    slotProps={{ input: { ref: field.ref } }}
                    aria-label="Newsletter (opcjonalnie)"
                  />
                }
                label="Chcę otrzymywać newsletter (opcjonalnie)"
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onBack} variant="outlined" type="button">
          ← Wróć
        </Button>
        <Button type="submit" variant="contained">
          Dalej →
        </Button>
      </Box>
    </Box>
  );
};

export default Step2;
