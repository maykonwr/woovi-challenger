import { ChangeEvent, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { creditCardStore } from "../stores"
import { maskCPF, maskCreditCardNumber, maskExpiration } from "../utils"

export const useCreditCard = () => {
  const navigate = useNavigate()
  const { fields } = creditCardStore.getState()

  const [maskedCpf, setMaskedCpf] = useState("")
  const [maskedCardNumber, setMaskedCardNumber] = useState("")
  const [maskedExpiration, setMaskedExpiration] = useState("")
  const [isValidated, setIsValidate] = useState(false)

  type KeyTypes = "fullName" | "cpf" | "cardNumber" | "cvv" | "expiration"
  type EventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

  const handleInputChange = useCallback((event: EventType, key: KeyTypes) => {
    setIsValidate(false)
    fields[key] = event.target.value
  }, [fields])

  const handleCpfChange = useCallback((event: EventType) => {
    setIsValidate(false)
    const input = event.target.value
    const maskedInput = maskCPF(input)
    setMaskedCpf(maskedInput)
    fields.cpf = input
  }, [fields])

  const handleCardNumberChange = useCallback((event: EventType) => {
    setIsValidate(false)
    const input = event.target.value
    const maskedInput = maskCreditCardNumber(input)
    setMaskedCardNumber(maskedInput)
    fields.cardNumber = input
  }, [fields])

  const handleExpirationChange = useCallback((event: EventType) => {
    setIsValidate(false)
    const input = event.target.value
    const maskedInput = maskExpiration(input)
    setMaskedExpiration(maskedInput)
    fields.expiration = input
  }, [fields])

  const hasEmptyField = (inputs: string[]): boolean => {
    return inputs.includes("")
  }

  const onSubmit = () => {
    setIsValidate(true)
    const allInputs = Object.values(fields)
    if (!hasEmptyField(allInputs)) {
      navigate("/")
    }
  }

  return {
    maskedCardNumber,
    maskedCpf,
    maskedExpiration,
    handleCardNumberChange,
    handleCpfChange,
    handleExpirationChange,
    handleInputChange,
    isValidated,
    onSubmit,
  }
}
