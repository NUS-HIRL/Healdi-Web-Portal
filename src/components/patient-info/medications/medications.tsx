"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Eye,
} from "lucide-react";

import { TableHeaderCell } from "../../common/TableHeaderCell";
import { Modal } from "./Modal";
import { KeyValueRow } from "./key-value-row";
import { LabeledInput } from "./labeled-input";
import { Footer } from "@/components/common/footer";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/common/pagination";
import { Med } from "../../../types/medications-types";


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
          <Button
            type="button"
            onClick={() => setShowAdd(true)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
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
                      <Button
                        type="button"
                        onClick={() => setViewing(m)}
                        variant="outline"
                        size="icon"
                        className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                        aria-label={`View ${m.name}`}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
           <Pagination
            page={page}
            pageCount={pageCount}
            pageSize={pageSize}
            openPageSize={openPageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            setOpenPageSize={setOpenPageSize}
            />

        </div>
      </section>

      {/* Footer */}
      <Footer />

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
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleAdd}>
                Save
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
