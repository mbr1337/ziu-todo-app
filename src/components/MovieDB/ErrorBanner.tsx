import { Alert, Button, Stack } from "@mui/material";

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      sx={{ py: 4 }}
      role="status"
      aria-live="assertive"
      aria-atomic="true">
      <Alert severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
      <Button variant="contained" color="primary" onClick={onRetry}>
        Spróbuj ponownie
      </Button>
    </Stack>
  );
}
