export const fileOrDirExist = (filePath: string) => {
  try {
    Deno.statSync(filePath);
    return true;
  } catch (_: unknown) {
    return false;
  }
};