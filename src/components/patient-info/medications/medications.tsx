// components/patient/medications/medications.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Apple,
  Play,
  HeartPulse,
} from "lucide-react";

import TableHeaderCell from "./TableHeaderCell";
import Modal from "./Modal";
import KeyValueRow from "./KeyValueRow";
import LabeledInput from "./LabeledInput";

type Med = {
  id: string;
  name: string;
  dosage: string;
  type: string;
  creator: string;
};

const INITIAL_DATA: Med[] = [
  { id: "1", name: "Propranolol Hydrochloride", dosage: "500 mg", type: "Tablet", creator: "Patient" },
  { id: "2", name: "Amiloride Hydrochloride / Hydrochlorothiazide", dosage: "5 / 50 mg", type: "Tablet", creator: "Patient" },
  { id: "3", name: "Metformin", dosage: "500 mg", type: "Tablet", creator: "Patient" },
  { id: "4", name: "Paracetamol", dosage: "N/A", type: "Tablet", creator: "Patient" },
];

export default function Medications() {
  const [rows, setRows] = useState<Med[]>(INITIAL_DATA);

  // sorting
  const [sortKey, setSortKey] = useState<keyof Med>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openPageSize, setOpenPageSize] = useState(false);

  // modals
  const [viewing, setViewing] = useState<Med | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  // add form (dummy)
  const [form, setForm] = useState<Pick<Med, "name" | "dosage" | "type" | "creator">>({
    name: "",
    dosage: "",
    type: "Tablet",
    creator: "Patient",
  });

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  function toggleSort(key: keyof Med) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleAdd() {
    if (!form.name.trim()) {
      alert("Enter a medication name (dummy validation).");
      return;
    }
    const newRow: Med = {
      id: String(Date.now()),
      name: form.name.trim(),
      dosage: form.dosage.trim() || "N/A",
      type: form.type,
      creator: form.creator,
    };
    setRows((r) => [newRow, ...r]);
    setShowAdd(false);
    setForm({ name: "", dosage: "", type: "Tablet", creator: "Patient" });
  }

  return (
    <div className="w-full px-4 py-6">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Medications</h1>

      {/* Card */}
      <section className="rounded-xl border border-gray-200 bg-gray-50">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-gray-800 font-semibold">Medication Plan</h2>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {/* Table */}
        <div className="px-4 py-4">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-gray-50 text-left">
                <tr className="text-sm text-gray-700">
                  <TableHeaderCell
                    label="Medication Name"
                    active={sortKey === "name"}
                    dir={sortDir}
                    onClick={() => toggleSort("name")}
                  />
                  <TableHeaderCell
                    label="Dosage"
                    active={sortKey === "dosage"}
                    dir={sortDir}
                    onClick={() => toggleSort("dosage")}
                  />
                  <TableHeaderCell
                    label="Type"
                    active={sortKey === "type"}
                    dir={sortDir}
                    onClick={() => toggleSort("type")}
                  />
                  <TableHeaderCell
                    label="Creator"
                    active={sortKey === "creator"}
                    dir={sortDir}
                    onClick={() => toggleSort("creator")}
                  />
                  <TableHeaderCell label="Action" noSort />
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {pageItems.map((m) => (
                  <tr key={m.id} className="text-gray-700">
                    <td className="px-4 py-4 truncate">{m.name}</td>
                    <td className="px-4 py-4">{m.dosage}</td>
                    <td className="px-4 py-4">{m.type}</td>
                    <td className="px-4 py-4">{m.creator}</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setViewing(m)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                        aria-label={`View ${m.name}`}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-end gap-2 relative">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
              disabled={page <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex h-8 min-w-[2rem] items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-2 text-sm font-medium text-gray-700"
              aria-current="page"
            >
              {page}
            </button>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              aria-label="Next page"
              disabled={page >= pageCount}
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="ml-2 relative">
              <button
                type="button"
                onClick={() => setOpenPageSize((o) => !o)}
                className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                aria-haspopup="listbox"
                aria-expanded={openPageSize}
              >
                {pageSize} / page
                <ChevronDown className="h-4 w-4" />
              </button>
              {openPageSize && (
                <div
                  className="absolute right-0 z-10 mt-1 w-28 overflow-hidden rounded-md border border-gray-200 bg-white shadow"
                  role="listbox"
                >
                  {[5, 10, 20].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setPageSize(s);
                        setOpenPageSize(false);
                        setPage(1);
                      }}
                      className={`block w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${
                        s === pageSize ? "bg-gray-100" : ""
                      }`}
                      role="option"
                      aria-selected={s === pageSize}
                    >
                      {s} / page
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Download app card */}
      <section className="mt-6 rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-gray-800 font-medium">Download Healdi App</h3>
            <p className="text-sm text-gray-500">
              Harness the power of the Healdi app to enhance your health tracking journey.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <Apple className="h-4 w-4" />
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <Play className="h-4 w-4" />
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-6">
        <div className="h-px w-full bg-gray-200" />
        <div className="flex flex-col items-center justify-between gap-3 py-5 text-sm text-gray-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-50">
              <HeartPulse className="h-4 w-4 text-pink-500" />
            </div>
            <span className="font-medium text-gray-700">Healdi</span>
          </div>
          <span>© Healdi. All Rights Reserved.</span>
        </div>
      </footer>

      {/* View Modal (dummy) */}
      {viewing && (
        <Modal onClose={() => setViewing(null)} title="Medication Details">
          <div className="space-y-2 text-sm">
            <KeyValueRow label="Medication Name" value={viewing.name} />
            <KeyValueRow label="Dosage" value={viewing.dosage} />
            <KeyValueRow label="Type" value={viewing.type} />
            <KeyValueRow label="Creator" value={viewing.creator} />
          </div>
        </Modal>
      )}

      {/* Add Modal (dummy) */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} title="Add Medication">
          <div className="space-y-3">
            <LabeledInput
              label="Medication Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Atorvastatin"
            />
            <LabeledInput
              label="Dosage"
              value={form.dosage}
              onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
              placeholder="e.g. 20 mg"
            />
            <LabeledInput
              label="Type"
              value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              placeholder="e.g. Tablet"
            />
            <LabeledInput
              label="Creator"
              value={form.creator}
              onChange={(e) => setForm((f) => ({ ...f, creator: e.target.value }))}
              placeholder="e.g. Patient"
            />
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
