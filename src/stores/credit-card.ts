import { createStore } from "."

export const creditCardStore = createStore({
  fields: {
    fullName: "",
    cpf: "",
    cardNumber: "",
    expiration: "",
    cvv: ""
  }
})

export type ValuescreditCardStore = ReturnType<typeof creditCardStore.getState>
