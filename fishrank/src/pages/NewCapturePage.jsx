import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiImage, FiUpload } from 'react-icons/fi';
import { Button, Input, Select, Textarea, Toast } from '../components/common';
import { FISH_SPECIES, STATES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { captureService } from '../services/captureService';
import { postService } from '../services/postService';
import { progressionService } from '../services/progressionService';
import { storageService } from '../services/storageService';

export const NewCapturePage = () => {
  const [formData, setFormData] = useState({
    fishName: '',
    species: '',
    weight: '',
    length: '',
    city: '',
    state: '',
    location: '',
    description: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const updatePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!photoFile) return 'Envie uma foto do peixe.';
    if (!formData.fishName.trim()) return 'Informe o nome do peixe.';
    if (!formData.species) return 'Escolha a espécie.';
    if (!formData.weight || Number(formData.weight) <= 0) return 'Informe um peso válido.';
    if (!formData.length || Number(formData.length) <= 0) return 'Informe um comprimento válido.';
    if (!formData.city.trim()) return 'Informe a cidade.';
    if (!formData.state) return 'Informe o estado.';
    if (!formData.location.trim()) return 'Informe o local da captura.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const photoURL = await storageService.uploadCapturePhoto(photoFile, user.uid);
      const createdAt = new Date();
      const capture = await captureService.createCapture(user.uid, {
        ...formData,
        weight: Number(formData.weight),
        length: Number(formData.length),
        photoURL,
        capturedAt: createdAt,
      });
      await postService.createPost({
        uid: user.uid,
        displayName: userProfile?.displayName || user.displayName || 'Usuario',
        photoURL: userProfile?.photoURL || user.photoURL || '',
        equippedTitle: userProfile?.equippedTitle || userProfile?.equipedTitle || 'fishing_beginner',
        species: formData.species || formData.fishName,
        weight: Number(formData.weight),
        length: Number(formData.length),
        location: formData.location,
        city: formData.city,
        state: formData.state,
        description: formData.description,
        imageURL: photoURL,
        captureId: capture.id,
        createdAt,
      });
      await progressionService.refreshUserProgress(user.uid);
      setSuccess('Captura registrada, ranking atualizado e publicada no Feed.');
      setTimeout(() => navigate('/feed'), 900);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-light px-4 py-6 pb-24 md:ml-64 md:px-8 md:pb-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6">
          <h1 className="text-3xl font-black text-primary">Nova Captura</h1>
          <p className="text-sm text-gray-600">Publique a foto, medidas e local da pescaria.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-lg bg-white p-5 shadow-md">
          <label className="block rounded-lg border-2 border-dashed border-blue-200 bg-blue-50 p-4 transition hover:border-secondary">
            {photoPreview ? (
              <img src={photoPreview} alt="Prévia da captura" className="h-72 w-full rounded-lg object-cover" />
            ) : (
              <div className="flex h-56 flex-col items-center justify-center text-center text-primary">
                <FiImage size={42} />
                <p className="mt-3 font-bold">Enviar foto da captura</p>
                <p className="text-sm text-gray-600">PNG, JPG ou WEBP</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={updatePhoto} className="hidden" />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nome do peixe" name="fishName" value={formData.fishName} onChange={updateField} placeholder="Tucunaré açu" />
            <Select
              label="Espécie"
              name="species"
              value={formData.species}
              onChange={updateField}
              options={FISH_SPECIES.map((species) => ({ value: species, label: species }))}
            />
            <Input label="Peso (kg)" name="weight" type="number" step="0.1" value={formData.weight} onChange={updateField} />
            <Input label="Comprimento (cm)" name="length" type="number" step="0.1" value={formData.length} onChange={updateField} />
            <Input label="Cidade" name="city" value={formData.city} onChange={updateField} placeholder="Ex: Manaus" />
            <Select
              label="Estado"
              name="state"
              value={formData.state}
              onChange={updateField}
              options={STATES.map((state) => ({ value: state, label: state }))}
            />
            <Input label="Local" name="location" value={formData.location} onChange={updateField} placeholder="Rio, lago, represa..." />
          </div>

          <Textarea
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={updateField}
            placeholder="Conte os detalhes da captura."
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" loading={loading} size="full">
              <FiUpload />
              Publicar
            </Button>
            <Button type="button" variant="outline" size="full" onClick={() => navigate('/home')} disabled={loading}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
      {success && <Toast message={success} type="success" onClose={() => setSuccess('')} />}
    </main>
  );
};
