export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileExt = file.name.split(".").pop();
      // Remove the Data-URL header
      resolve(`${reader.result},${fileExt}` as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
