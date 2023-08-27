export type Volunteer = {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: number;
  status: boolean;
  id: number;
}

export type TableEntryActions = {
  edit: (volunteerId: number) => void;
  delete: (volunteerId: number) => void;
}
