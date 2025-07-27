export interface ClubItem {
  contact_info: ContactInfo;
  _id: string;
  name: string;
  description: string;
  club_logo: string;
  ac_name: string;
  prov_name: string;
  city_name: string;
  admin: {
    name: string;
    last_name: string;
  };
  coaches: any[];
  athletes: any[];
  competitions: any[];
  membership_price: number;
  created_at: Date;
  __v: number;
}

export interface ContactInfo {
  social_media: SocialMedia;
  phone: string;
  email: string;
  website: string;
}

export interface SocialMedia {
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface Club {
  contact_info: ContactInfo;
  _id: string;
  name: string;
  description: string;
  club_logo: string;
  ac_name: string;
  prov_name: string;
  city_name: string;
  admin: {
    name: string;
    last_name: string;
  };
  coaches: any[];
  athletes: any[];
  competitions: any[];
  membership_price: number;
  created_at: Date;
}

export interface ClubResponse {
  clubs: ClubItem[];
}
