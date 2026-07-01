import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from '../firebase/config';

export const storageService = {
  // Upload de arquivo
  uploadFile: async (file, path) => {
    try {
      if (!file) throw new Error('Nenhum arquivo fornecido');
      
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Upload de foto de perfil
  uploadProfilePhoto: async (file, uid) => {
    try {
      const fileName = `profile_${uid}_${Date.now()}`;
      const path = `profiles/${uid}/${fileName}`;
      return await storageService.uploadFile(file, path);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Upload de foto de captura
  uploadCapturePhoto: async (file, uid) => {
    try {
      const fileName = `capture_${uid}_${Date.now()}`;
      const path = `captures/${uid}/${fileName}`;
      return await storageService.uploadFile(file, path);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Deletar arquivo
  deleteFile: async (fileURL) => {
    try {
      if (!fileURL) return;
      
      const fileRef = ref(storage, fileURL);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      // Não lançar erro para não quebrar o fluxo
    }
  },

  // Deletar foto de perfil
  deleteProfilePhoto: async (fileURL) => {
    try {
      await storageService.deleteFile(fileURL);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Deletar foto de captura
  deleteCapturePhoto: async (fileURL) => {
    try {
      await storageService.deleteFile(fileURL);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
