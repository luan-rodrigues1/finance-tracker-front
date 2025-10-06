import * as yup from "yup";

export const transactionSchema = yup.object().shape({
  description: yup.string().required("Descrição é obrigatória*").max(100, "Descrição não pode exceder 100 caracteres*"),
  amount: yup
  .number()
  .typeError("Valor deve ser numérico")
  .required("Valor é obrigatório")
  .transform((val, originalValue) =>
    originalValue === "" ? NaN : Number(originalValue.replace(",", "."))
  )
  .positive("Valor deve ser positivo"), 

  type: yup.string().oneOf(["Receita", "Despesa"], "Tipo inválido*").required("Tipo é obrigatório*"),
  date: yup
  .date()
  .transform((value, originalValue) => {
    return originalValue === "" ? undefined : value;
  })
  .required("Data é obrigatória*")
});