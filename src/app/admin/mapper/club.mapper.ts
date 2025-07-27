import { Club, ClubItem } from '../interfaces/club.interfaces';

export class ClubMapper {
  static mapClubItem(club: ClubItem): Club {
    return {
      _id: club._id,
      name: club.name,
      club_logo: club.club_logo,
      description: club.description ?? '',
      admin: club.admin,
      contact_info: {
        phone: club.contact_info?.phone ?? '',
        email: club.contact_info?.email ?? '',
        social_media: {
          instagram: club.contact_info?.social_media?.instagram ?? '',
          facebook: club.contact_info?.social_media?.facebook ?? '',
          youtube: club.contact_info?.social_media?.youtube ?? '',
        },
        website: '',
      },
      ac_name: club.ac_name,
      prov_name: club.prov_name,
      city_name: club.city_name,
      athletes: club.athletes,
      coaches: club.coaches,
      competitions: club.competitions,
      membership_price: club.membership_price,
      created_at: club.created_at,
    };
  }

  static mapClubItemsToClubArray(clubs: ClubItem[]): Club[] {
    return clubs.map(this.mapClubItem);
  }
}
