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
    <div className="rounded-xl shadow-sm px-6 pt-4 bg-white max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        {student.name}'s Invoice
      </h2>

      {/* Optional Items */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-0">Optional Items</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
          {OptionalInvoiceItems.map((item) => (
            <label
              key={item.id}
              className="flex items-center bg-gray-50 rounded px-3 py-2 border"
            >
              <input
                type="checkbox"
                onChange={() => toggleItem(item)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                {item.name} – GH₵ {item.amount}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Feeding Selection */}
      <div className="mb-2">
        <h3 className="font-medium text-gray-700 mb-2 -mt-3">Feeding Plan</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm mb-1">Feeding Type</label>
            <select
              value={feeding.type}
              onChange={(e) => setFeeding({ ...feeding, type: e.target.value })}
              className="border rounded px-3 py-2 w-40"
            >
              <option value="">None</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Number of Days</label>
            <input
              type="number"
              value={feeding.days}
              onChange={(e) =>
                setFeeding({ ...feeding, days: parseInt(e.target.value) || 0 })
              }
              className="border rounded px-3 py-2 w-24"
              min={0}
            />
          </div>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Discount</label>
          <select
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">None</option>
            <option value="10%">10%</option>
            <option value="50%">50%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Arrears</label>
          <input
            type="number"
            value={arrears}
            onChange={(e) => setArrears(parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Overpaid</label>
          <input
            type="number"
            value={overPaid}
            onChange={(e) => setOverPaid(parseFloat(e.target.value) || 0)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>
      {/* Total and Submit */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-lg font-semibold text-blue-700">
          Total: GH₵ {total[0].toFixed(2)}
        </div>
        <button
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition duration-200"
        >
          Add to Print Queue
        </button>
      </div>
    </div>
  );
}
