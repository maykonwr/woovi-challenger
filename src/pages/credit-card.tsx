import { useEffect } from "react"
import { CreditCardForm, PageHeader, Summary } from "../components"
import { paymentOptionsStore, installmentStepStore } from "../stores"
import { PIX_OPTIONS } from "../helpers/payment-methods.helper"

export const CreditCard = () => {
  const { selectedOption } = paymentOptionsStore.getState()

  useEffect(() => {
    installmentStepStore.setState({
      currentStep: 1,
    })
  }, [])

  const installments = selectedOption.installment - 1

  const installmentOptions = PIX_OPTIONS.map(option => 
    `${option.installment}x de R$ ${(option.amount as number).toFixed(2)}`
  )

  return (
    <>
      <PageHeader
        title={`João, pague o restante em ${installments}x no cartão`}
      />
      <CreditCardForm installmentOptions={installmentOptions} selectedInstallment={selectedOption.installment} />
      <Summary />
    </>
  )
}
