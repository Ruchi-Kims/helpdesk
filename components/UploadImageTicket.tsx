'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImagePlus, Loader2 } from 'lucide-react';

interface UploadImageTicketProps {
  ticketId: string;
}

interface CloudinaryResponse {
  secure_url: string;
}

export default function UploadImageTicket({ ticketId }: UploadImageTicketProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [erreur, setErreur] = useState<string>('');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErreur('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );

      if (!res.ok) throw new Error("Échec de l'upload");

      const data: CloudinaryResponse = await res.json();

      await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pieceJointe: data.secure_url }),
      });

      router.refresh();
    } catch (err) {
      setErreur("Erreur lors de l'envoi de l'image");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[#8B8FA3] uppercase tracking-wide">
        Pièce jointe
      </label>
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
      {erreur && <p className="text-xs text-red-600">{erreur}</p>}
    </div>
  );
}