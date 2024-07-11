import { Button, MenuItem, Stack, TextField } from "@mui/material"
import { useCreditCard } from "../../hooks"
import { creditCardStore } from "../../stores"

interface CreditCardFormProps {
  installmentOptions: string[]
  selectedInstallment: number
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({ installmentOptions, selectedInstallment }) => {
  const { fullName, cvv } = creditCardStore.useStore((state) => state?.fields)
  const {
    maskedCardNumber,
    maskedCpf,
    maskedExpiration,
    handleCardNumberChange,
    handleCpfChange,
    handleExpirationChange,
    handleInputChange,
    isValidated,
    onSubmit,
  } = useCreditCard()

  const errors = {
    fullName: isValidated && !fullName && "Nome completo é obrigatório",
    maskedCpf: isValidated && !maskedCpf && "CPF é obrigatório",
    maskedCardNumber: isValidated && !maskedCardNumber && "Número do cartão é obrigatório",
    maskedExpiration: isValidated && !maskedExpiration && "Validade é obrigatório",
    cvv: isValidated && !cvv && "CVV é obrigatório",
  }

  const defaultInstallment = installmentOptions.find(
    (option) => option.startsWith(`${selectedInstallment}x`)
  ) || installmentOptions[0]

  return (
    <Stack
      spacing={3}
      component="form"
      noValidate={!isValidated}
      autoComplete="off"
      sx={{
        "& .MuiInputBase-root": {
          fontWeight: "regular",
        },
      }}
    >
      <TextField
        error={!!errors.fullName}
        fullWidth
        helperText={errors.fullName}
        id="full-name"
        label="Nome completo"
        onChange={(event) => handleInputChange(event, "fullName")}
        required
        variant="outlined"
      />
      <TextField
        error={!!errors.maskedCpf}
        fullWidth
        helperText={errors.maskedCpf}
        id="cpf"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 14 }}
        label="CPF"
        onChange={handleCpfChange}
        required
        type="tel"
        value={maskedCpf}
        variant="outlined"
      />
      <TextField
        error={!!errors.maskedCardNumber}
        fullWidth
        helperText={errors.maskedCardNumber}
        id="card-number"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 19 }}
        label="Número do cartão"
        onChange={handleCardNumberChange}
        required
        type="tel"
        value={maskedCardNumber}
        variant="outlined"
      />
      <Stack direction="row" spacing={3}>
        <TextField
          error={!!errors.maskedExpiration}
          fullWidth
          helperText={errors.maskedExpiration}
          id="expiration"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 5 }}
          label="Vencimento"
          onChange={handleExpirationChange}
          required
          type="tel"
          value={maskedExpiration}
          variant="outlined"
        />
        <TextField
          error={!!errors.cvv}
          fullWidth
          helperText={errors.cvv}
          id="cvv"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 3 }}
          label="CVV"
          onChange={(event) => handleInputChange(event, "cvv")}
          required
          type="tel"
          variant="outlined"
        />
      </Stack>
      <TextField
        id="installments"
        label="Parcelas"
        select
        value={defaultInstallment}
      >
        {installmentOptions.map((option: string) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" fullWidth onClick={onSubmit}>
        Pagar
      </Button>
    </Stack>
  )
}
