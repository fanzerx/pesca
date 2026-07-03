const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

export async function uploadImage(file) {
  if (!file) return '';

  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary nao esta configurado. Verifique as variaveis de ambiente.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.secure_url) {
      throw new Error(data?.error?.message || 'Nao foi possivel enviar a imagem.');
    }

    return data.secure_url;
  } catch (error) {
    throw new Error(error.message || 'Falha ao enviar imagem. Tente novamente em instantes.');
  }
}

export const imageService = {
  uploadImage,
};
