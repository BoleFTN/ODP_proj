import { useState } from "react";
import { materialsApi } from "../../api_services/materials/MaterialAPIServices";
import { useAuth } from "../../hooks/auth/useAuthHook";

interface MaterialFormProps {
  courseId: number;
  onMaterialAdded: (newMaterial: any) => void;
}

export const MaterialForm: React.FC<MaterialFormProps> = ({ courseId, onMaterialAdded }) => {
  const { user, token } = useAuth();
  const [materialName, setMaterialName] = useState<string>('');
  const [filepath, setFilepath] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) {
      alert("Niste ulogovani.");
      return;
    }

    try {
      const newMaterialData = {
        materialName: materialName,
        filepath,
        userId: user.id,
        courseId,
        description,
      };
      
      const addedMaterial = await materialsApi.createMaterial(newMaterialData, token);
      onMaterialAdded(addedMaterial); // Poziva roditeljsku funkciju za ažuriranje liste

      // Resetujemo formu
      setMaterialName('');
      setFilepath('');
      setDescription('');
      
      alert("Materijal je uspešno dodat!");
    } catch (err) {
      alert("Greška pri dodavanju materijala.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleAddMaterial} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mb-8">
      <h3 className="text-lg font-bold mb-4">Dodaj novi materijal</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="materialName">
          Naziv materijala
        </label>
        <input
          id="materialName"
          type="text"
          value={materialName}
          onChange={(e) => setMaterialName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filepath">
          Putanja fajla
        </label>
        <input
          id="filepath"
          type="text"
          value={filepath}
          onChange={(e) => setFilepath(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Opis
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-500 transition-colors"
        >
          Dodaj materijal
        </button>
      </div>
    </form>
  );
};