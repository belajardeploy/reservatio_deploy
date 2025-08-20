
interface api{
  requestfunc: (...val: any) => Promise<any>
}

export async function ApiHandler({ requestfunc }: api): Promise<any> {
  try {
    const response = await requestfunc();
    return response
  } catch (error) {
    // console.error("Error in ApiHandler:", error);
    throw error; // Melempar error agar bisa ditangani di tempat lain
  }
}