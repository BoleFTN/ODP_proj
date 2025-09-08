import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { materialsApi } from "../../api_services/materials/MaterialAPIServices";
import { useAuth } from "../../hooks/auth/useAuthHook";
import { MaterialDTO } from "../../models/material/MaterialDTO";
import { MaterialsList } from "./MaterialsList";
import { MaterialForm } from "./MaterialForm";

export function CourseMaterials() {
  const { courseId } = useParams<{ courseId: string }>();
  const { token } = useAuth();
  
  const [materials, setMaterials] = useState<MaterialDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!courseId || !token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const fetchedMaterials = await materialsApi.findMaterials(Number(courseId));
        setMaterials(fetchedMaterials);
      } catch (err) {
        setError("Greška pri dohvatanju materijala.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [courseId, token]);
  
  const handleMaterialAdded = (newMaterial: MaterialDTO) => {
      setMaterials(prevMaterials => [...prevMaterials, newMaterial]);
  };

  if (loading) {
    return <p>Učitavam materijale...</p>;
  }

  if (error) {
    return <p style={{ color: "red", marginTop: "10px" }}>{error}</p>;
  }

  return (
    <>
      <h2 className="text-xl text-white mb-4">Materijali za predmet {courseId}</h2>
      
      <MaterialForm courseId={Number(courseId)} onMaterialAdded={handleMaterialAdded} />
      
      <MaterialsList materials={materials} />
    </>
  );
}