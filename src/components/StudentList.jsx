export default function StudentList({ students, onSelectStudent }) {
  return (
    <div>
      {students.map((st, index) => (
        <button
          key={index}
          onClick={() => onSelectStudent(st)}
          className="block p-2 hover:bg-gray-100"
        >
          {st.name}
        </button>
      ))}
    </div>
  );
}
