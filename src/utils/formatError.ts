export const formatError = (error: any) => {
  if (error?.response?.data?.validation?.body?.message) {
    return error?.response?.data?.validation?.body?.message;
  }


  return error?.response?.data?.message
    ? error.response?.data?.message
    : JSON.stringify(error)
}