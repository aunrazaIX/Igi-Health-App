export interface PersonelDataSection {
  edit: boolean;
  delete: boolean;
  sectionTitle: string;
  icon: any;
  info: {
    label: string;
    value: string;
  }[];
}

export interface ClaimDetailSection {
  sectionTitle: string;
  icon: any;
  edit: boolean;
  delete: boolean;
  info: {
    label: string;
    value: string;
    total?: boolean;
  }[];
}

export interface UploadDocSection {
  pickFile: () => void;
}

export interface PatientList {
  value: string | number;
  name: string;
}

export interface StepItem {
  label: string;
  key: string;
}
export interface DependantList {
  UNIQUE_NUMBER?: number;
  CLNTNUM?: number;
  SECUITYNO?: string;
  LGIVNAME?: string;
  CLTSEX?: string;
  CLTDOB?: number;
  DPNTNO?: string;
  EMPNO?: string;
  AGE?: number;
  DPNTTYPE?: string;
  CHDRNUM?: string;
  PolicyType?: string;
  value?: string;
  label?: string;
}
