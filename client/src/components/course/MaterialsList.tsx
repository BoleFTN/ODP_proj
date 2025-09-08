import { MaterialDTO } from "../../models/material/MaterialDTO";

interface MaterialsListProps {
  materials: MaterialDTO[];
}

export const MaterialsList: React.FC<MaterialsListProps> = ({ materials }) => {
  return (
    <ul className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
      {materials.length > 0 ? (
        materials.map((material) => (
          <li key={material.materialId} className="mb-2 p-2 border-b border-gray-200">
            <span className="text-gray-800 font-bold">{material.materialName}</span>
            <p className="text-sm text-gray-600 mt-1">{material.description}</p>
            <a href={material.filepath} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm mt-1">
              Pogledaj materijal
            </a>
          </li>
        ))
      ) : (
        <p className="text-gray-600">Nema dodatog materijala.</p>
      )}
    </ul>
  );
};