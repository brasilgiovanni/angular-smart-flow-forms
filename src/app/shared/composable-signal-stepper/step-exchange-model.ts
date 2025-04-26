export interface StepExchangeModel {
previousStep: StepModel,
  currentStep: StepModel
}

export interface StepModel {
    title: string,
    index: number,
}