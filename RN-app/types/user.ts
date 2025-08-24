export interface UserProfile {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: string;
  url: string;
  phone: string | null;
  displayname: string;
  kind: string;
  image: {
    link: string;
    versions: {
      large: string;
      medium: string;
      small: string;
      micro: string;
    };
  };
  staff?: boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string | null;
  alumni?: boolean;
  active?: boolean;
  campus: {
    id: number;
    name: string;
    time_zone: string;
    language: {
      id: number;
      name: string;
      identifier: string;
      created_at: string;
      updated_at: string;
    };
    users_count: number;
    vogsphere_id: number;
  }[];
  cursus_users: {
    id: number;
    begin_at: string;
    end_at: string | null;
    grade: string | null;
    level: number;
    skills: any[];
    cursus_id: number;
    has_coalition: boolean;
    cursus: {
      id: number;
      created_at: string;
      name: string;
      slug: string;
    };
  }[];
}
