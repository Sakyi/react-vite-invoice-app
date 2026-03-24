import { useState } from "react";
import { titleCase } from "@/utils/TitleCase";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react"; // Assuming lucide-react for icons

export default function StudentList({
  students,
  onSelectStudent,
  setStudents,
}) {
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newStudentName, setNewStudentName] = useState("");
  const [editName, setEditName] = useState("");

  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()),
  );

  // --- CRUD Handlers ---

  const handleAdd = () => {
    if (!newStudentName.trim()) return;
    const newStudent = {
      id: `stu-${Math.floor(Math.random() * 10000)}`, // Temporary ID generation
      name: newStudentName.trim().toUpperCase(),
    };
    setStudents([...students, newStudent]);
    setNewStudentName("");
    setIsAdding(false);
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditName(student.name);
  };

  const handleSaveEdit = (id) => {
    setStudents(
      students.map((st) =>
        st.id === id ? { ...st, name: editName.toUpperCase() } : st,
      ),
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((st) => st.id !== id));
    }
  };

  return (
    <div className="w-full px-0 mx-0 md:w-30 lg:w-[350px] h-screen md:sticky top-0 shadow-md overflow-y-auto bg-white">
      {/* Header & Search */}
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Students</h2>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            {isAdding ? <X size={18} /> : <Plus size={18} />}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search student..."
          className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add Student Form */}
      {isAdding && (
        <div className="p-4 bg-blue-50 border-b">
          <input
            type="text"
            placeholder="Enter full name"
            className="w-full px-3 py-2 border rounded-md text-sm mb-2"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium"
          >
            Confirm Add
          </button>
        </div>
      )}

      {/* Student List */}
      <div className="divide-y">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((st) => (
            <div
              key={st.id}
              className="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              {editingId === st.id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    className="flex-grow px-2 py-1 border rounded text-sm"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(st.id)}
                    className="text-green-600"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-red-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onSelectStudent(st)}
                    className="flex-grow text-left focus:outline-none"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {titleCase(st.name)}
                    </p>
                    <p className="text-xs text-gray-500">{st.id}</p>
                  </button>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(st)}
                      className="p-1 text-gray-400 hover:text-blue-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(st.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-400 text-sm">
            No students found.
          </div>
        )}
      </div>
    </div>
  );
}
