import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';
import { Button, Input, Select, Textarea, Toast } from '../components/common';
import { getAllTitles } from '../constants/titles';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';

export const EditProfilePage = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    city: userProfile?.city || '',
    bio: userProfile?.bio || '',
    equippedTitle: userProfile?.equippedTitle || userProfile?.equipedTitle || 'fishing_beginner',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(userProfile?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const unlockedTitles = userProfile?.unlockedTitles || ['fishing_beginner'];
  const titleOptions = getAllTitles()
    .filter((title) => unlockedTitles.includes(title.id))
    .map((title) => ({ value: title.id, label: title.name }));

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const updatePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const photoURL = photoFile ? await storageService.uploadProfilePhoto(photoFile, user.uid) : preview;
      await updateProfile({ ...formData, photoURL });
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5 rounded-lg bg-white p-5 shadow-md">
        <header>
          <h1 className="text-3xl font-black text-primary">Editar Perfil</h1>
          <p className="text-sm text-gray-600">Atualize seus dados públicos no FishRank.</p>
        </header>

        <label className="flex items-center gap-4 rounded-lg bg-light p-4">
          {preview ? (
            <img src={preview} alt="Perfil" className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
              {(formData.displayName || 'U').slice(0, 1).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-bold text-primary">Foto de perfil</p>
            <p className="text-sm text-gray-600">Clique para trocar a imagem.</p>
          </div>
          <input type="file" accept="image/*" onChange={updatePhoto} className="hidden" />
        </label>

        <Input label="Nome" name="displayName" value={formData.displayName} onChange={updateField} />
        <Input label="Cidade" name="city" value={formData.city} onChange={updateField} />
        <Textarea label="Biografia" name="bio" value={formData.bio} onChange={updateField} />
        <Select
          label="Título equipado"
          name="equippedTitle"
          value={formData.equippedTitle}
          onChange={updateField}
          options={titleOptions}
        />

        <Button type="submit" loading={loading} size="full">
          <FiSave />
          Salvar alterações
        </Button>
      </form>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </main>
  );
};
