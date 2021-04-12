class ReducerError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ReducerError.prototype);
  }
}

export default ReducerError;
