import { CourseDTO } from "../../models/course/CourseDTO";

interface RedUTabeliKurseva {
  kurs: CourseDTO;
}

export function RedUTabeliKurseva({ kurs }: RedUTabeliKurseva) {
  return (
    <tr className="hover:bg-gray-100 transition">
      <td className="px-4 py-2">{kurs.courseId}</td>
      <td className="px-4 py-2">{kurs.courseName}</td>
    </tr>
  );
}