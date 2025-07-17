import { useState } from "react";
import { calculateInvoice } from "../utils/CalculateInvoices";
import { OptionalInvoiceItems } from "../data/records";

export default function InvoiceForm({
  student,
  onGenerate,
  selectedClass,
  setDiscount,
  discount,
  setTotalFee,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [feeding, setFeeding] = useState({ type: "", days: 0 });
  const [arrears, setArrears] = useState(0);
  const [overPaid, setOverPaid] = useState(0);
  const [updatedItems, setUpdatedItems] = useState([]);

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const total = calculateInvoice(
    selectedItems,
    feeding,
    discount,
    selectedClass,
    arrears,
    overPaid
  );

  const updatedThings = total[1];

  return (
    <div className="border p-4 my-4">
      <h3 className="font-bold pb-4">{student.name}'s Invoice</h3>

      <div className="grid grid-cols-2 gap-2">
        {OptionalInvoiceItems.map((item) => (
          <label key={item.id} className="flex items-center">
            <input type="checkbox" onChange={() => toggleItem(item)} />
            <span className="ml-2">
              {item.name} - GH₵ {item.amount}
            </span>
          </label>
        ))}
      </div>

      <div className="mt-4">
        <label>Feeding Type:</label>
        <select
          onChange={(e) => setFeeding({ ...feeding, type: e.target.value })}
        >
          <option value="">None</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="both">Both</option>
        </select>

        <label className="ml-4">Days:</label>
        <input
          type="number"
          className="border ml-2 w-20"
          onChange={(e) =>
            setFeeding({ ...feeding, days: parseInt(e.target.value) })
          }
        />
      </div>

      <div className="mt-4">
        <label>Discount:</label>
        <select onChange={(e) => setDiscount(e.target.value)} className="ml-2">
          <option value="">None</option>
          <option value="10%">10%</option>
          <option value="50%">50%</option>
        </select>
      </div>
      <div className="mt-4">
        <label>Arrears:</label>
        <input
          type="number"
          className="border ml-2 w-20"
          onChange={(e) => setArrears(parseInt(e.target.value))}
        />
      </div>
      <div className="mt-4">
        <label className="">OverPaid:</label>
        <input
          type="number"
          className="border ml-2 w-20"
          onChange={(e) => setOverPaid(parseInt(e.target.value))}
        />
      </div>
      <div className="mt-4 font-bold">Total: GH₵ {total[0]}</div>

      <button
        className="mt-4 bg-blue-500 text-white p-2"
        onClick={() =>
          onGenerate({
            student,
            updatedThings,
            feeding,
            discount,
            total,
            arrears,
            overPaid,
          })
        }
      >
        Add to Print Queue
      </button>
    </div>
  );
}
