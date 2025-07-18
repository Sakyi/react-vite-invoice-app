import { useState } from "react";

export default function StudentList({ students, onSelectStudent }) {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full md:w-64 lg:w-[330px] h-screen md:sticky top-0 bg-white shadow-md overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Students</h2>
        <input
          type="text"
          placeholder="Search student..."
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="divide-y">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((st, index) => (
            <button
              key={index}
              onClick={() => onSelectStudent(st)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 focus:outline-none focus:bg-blue-100 transition"
            >
              <span className="text-gray-800 font-medium">{st.name}</span>
            </button>
          ))
        ) : (
          <p className="px-4 py-3 text-sm text-gray-500">No students found.</p>
        )}
      </div>
    </div>
  );
}
