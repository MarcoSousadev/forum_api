import { UseCaseError } from "src/core/errors/use-case-erro";

export class ResourceNotFoundError extends Error implements UseCaseError  {
  constructor() {
    super ('Resource not found')
  }
}