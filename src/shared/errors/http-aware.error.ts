export interface HttpAwareError {
  getHttpError(): Error;
}

export const isHttpAwareError = (error: any): error is HttpAwareError => {
  return 'getHttpError' in error;
};
