import { UseCaseError } from "src/core/errors/use-case-erro";

export class NotAllowedError extends Error implements UseCaseError  {
  constructor() {
    super ('Not Allowed')
  }
}