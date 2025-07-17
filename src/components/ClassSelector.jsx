export default function ClassSelector({ classes, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)} className="border p-2">
      <option value="">Select a Class</option>
      {classes.map((cls) => (
        <option key={cls} value={cls}>
          {cls}
        </option>
      ))}
    </select>
  );
}
