'use client';

import { useState } from 'react';
import { ImagePlus, X, Loader2 } from 'lucide-react';

export default function UploadImage({ valeurActuelle, onUploadSuccess }) {
  const [preview, setPreview] = useState(valeurActuelle || '');
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setErreur('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!res.ok) throw new Error('Échec de l\'upload');

      const data = await res.json();
      setPreview(data.secure_url);
      onUploadSuccess(data.secure_url);
    } catch (err) {
      setErreur('Erreur lors de l\'envoi de l\'image');
    } finally {
      setLoading(false);
    }
  }

  function supprimerImage() {
    setPreview('');
    onUploadSuccess('');
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#8B8FA3] uppercase tracking-wide">
        Pièce jointe
      </label>

      {preview ? (
        <div className="relative w-fit">
          <img
            src={preview}
            alt="Aperçu"
            className="max-h-40 rounded-lg border border-gray-200 object-cover"
          />
          <button
            type="button"
            onClick={supprimerImage}
            className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 shadow-sm"
          >
            <X size={14} className="text-gray-600" />
          </button>
        </div>
      ) : (
        <label className="flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-4 py-3 text-sm text-[#8B8FA3] cursor-pointer hover:bg-[#F4F2FC] transition-colors w-fit">
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <ImagePlus size={16} />
              Ajouter une image
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </label>
      )}

      {erreur && <p className="text-xs text-red-600">{erreur}</p>}
    </div>
  );
}