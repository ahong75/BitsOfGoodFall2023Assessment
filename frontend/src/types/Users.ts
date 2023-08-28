export type User = {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: number;
  status: boolean;
  id: string;
}

export type UserFormDisplayMode = "notDisplaying" | "updatingUser" | "creatingUser"
