export const tryCatchWrap = async (callback: any, setError: any) => {
  try {
    await callback();
  } catch (err: any) {
    setError(err);
    return err;
  }
};
