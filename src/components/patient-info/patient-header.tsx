import { Eye, User } from "lucide-react";

export type PatientHeaderProps = {
  patientId: string;
  dob?: string; // e.g. "12 / 03 / 1965"
  gender?: string; // e.g. "M"
  fitnessLevel?: string; // e.g. "Moderate"
  hrvMs?: number | string; // e.g. 65
  healthConditionsCount?: number; // e.g. 4
  allergiesCount?: number; // e.g. 3
  onViewHealthConditions?: () => void;
  onViewAllergies?: () => void;
};

const InfoCell = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="px-6 first:pl-0">
    <div className="text-xs font-medium text-gray-500">{label}</div>
    <div className="mt-1 text-base font-semibold text-gray-900">{children}</div>
  </div>
);

export const PatientHeader = ({
  patientId,
  dob = "12 / 03 / 1965",
  gender = "M",
  fitnessLevel = "Moderate",
  hrvMs = 65,
  healthConditionsCount = 4,
  allergiesCount = 3,
  onViewAllergies,
}: PatientHeaderProps) => (
  <header className="bg-white border-b border-gray-200 pt-8 pb-4 px-6">
    <div className="flex items-center justify-between">
      {/* Left: Avatar + ID */}
      <div className="flex items-center gap-4 pr-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
          <User className="text-white" size={24} />
        </div>
        <div>
          <div className="text-base font-semibold text-gray-900 leading-tight">
            {patientId}
          </div>
          <div className="text-sm text-gray-500">Patient</div>
        </div>
      </div>

      {/* Right: Key facts */}
      <div className="ml-8 pl-8 border-l border-gray-200 flex items-center divide-x divide-gray-200 ml-auto">
        <InfoCell label="DOB">{dob}</InfoCell>
        <InfoCell label="Gender">{gender}</InfoCell>
        <InfoCell label="Fitness Level">{fitnessLevel}</InfoCell>
        <InfoCell label="HRV (ms)">{hrvMs}</InfoCell>
        <InfoCell label="Health Conditions">
          <div className="flex items-center gap-3">
            <span>{healthConditionsCount}</span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="View health conditions"
            >
              <Eye size={14} className="-ml-0.5" aria-hidden="true" />
              View
            </button>
          </div>
        </InfoCell>
        <InfoCell label="Allergies">
          <div className="flex items-center gap-3">
            <span>{allergiesCount}</span>
            <button
              type="button"
              onClick={onViewAllergies}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-300 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="View allergies"
            >
              <Eye size={14} className="-ml-0.5" aria-hidden="true" />
              View
            </button>
          </div>
        </InfoCell>
      </div>
    </div>
  </header>
);
