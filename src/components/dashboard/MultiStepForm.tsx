import { useState, useRef, useEffect } from "react";
import { Backdrop, Box, Fade, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import type { Step1Data, Step2Data } from "../../utils/schemas";

const STEP_TITLES = ["Dane osobowe", "Preferencje", "Potwierdzenie"];

const simulateApiCall = (): Promise<200 | 409 | 500> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const r = Math.random();
      if (r < 0.33) resolve(200);
      else if (r < 0.66) resolve(409);
      else resolve(500);
    }, 1000);
  });

type Props = {
  onClose?: () => void;
};

export default function MultiStepForm({ onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | undefined>();
  const [step2Data, setStep2Data] = useState<Step2Data | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [serverError, setServerError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => {
      setSuccess(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, onClose]);

  const handleStep1Complete = (data: Step1Data) => {
    setStep1Data(data);
    setEmailError(undefined);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  const handleFinalSubmit = async () => {
    setServerError(undefined);
    const status = await simulateApiCall();
    if (status === 409) {
      setEmailError("Ten adres e-mail jest już zarejestrowany");
      setCurrentStep(1);
    } else if (status === 500) {
      setServerError("Błąd serwera, spróbuj ponownie");
    } else {
      setSuccess(true);
    }
  };

  return (
    <Box
      component="section"
      aria-label="Formularz rejestracji"
      sx={{ position: "relative" }}>
      <Backdrop
        open={success}
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        sx={{
          position: "absolute",
          zIndex: (theme) => theme.zIndex.modal + 1,
          borderRadius: 1,
          bgcolor: "rgba(255,255,255,0.92)",
          flexDirection: "column",
          gap: 1,
        }}>
        <Fade in={success} timeout={400}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: "success.main" }} />
            <Typography variant="h6" color="success.main" fontWeight={700}>
              Rejestracja zakończona!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Okno zamknie się automatycznie…
            </Typography>
          </Box>
        </Fade>
      </Backdrop>

      <Box component="nav" aria-label="Postęp rejestracji" sx={{ mb: 2 }}>
        <Box
          component="ol"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
          }}>
          {STEP_TITLES.map((title, i) => {
            const step = i + 1;
            const isCurrent = step === currentStep;
            const isDone = step < currentStep;
            return (
              <Box
                component="li"
                key={step}
                aria-current={isCurrent ? "step" : undefined}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.8125rem",
                  fontWeight: isCurrent ? 700 : 400,
                  opacity: isDone ? 0.65 : isCurrent ? 1 : 0.35,
                  border: isCurrent ? "2px solid" : "1px solid transparent",
                  borderColor: isCurrent ? "primary.main" : "transparent",
                  color: isCurrent ? "primary.main" : "text.primary",
                }}>
                {step}. {title}
                {isDone && (
                  <>
                    <span aria-hidden="true"> ✓</span>
                    <span
                      style={{
                        position: "absolute",
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        overflow: "hidden",
                        clip: "rect(0,0,0,0)",
                        whiteSpace: "nowrap",
                        borderWidth: 0,
                      }}>
                      (ukończony)
                    </span>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Typography
        id="multistep-form-title"
        component="h2"
        variant="h6"
        tabIndex={-1}
        ref={headingRef}
        sx={{ mb: 2, outline: "none" }}>
        {STEP_TITLES[currentStep - 1]}
      </Typography>

      {currentStep === 1 && (
        <Step1
          onComplete={handleStep1Complete}
          defaultValues={step1Data}
          externalEmailError={emailError}
        />
      )}
      {currentStep === 2 && (
        <Step2
          onComplete={handleStep2Complete}
          onBack={() => setCurrentStep(1)}
          defaultValues={step2Data}
        />
      )}
      {currentStep === 3 && step1Data && step2Data && (
        <Step3
          step1Data={step1Data}
          step2Data={step2Data}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleFinalSubmit}
          serverError={serverError}
        />
      )}
    </Box>
  );
}
