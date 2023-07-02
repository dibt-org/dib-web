/*
 "data": {
    "id": 613,
    "name": "İzmir Büyükşehir Belediyesi",
    "website": "https://www.izmir.bel.tr/",
    "email": "info@ızmir-buyuksehir-belediyesi.com",
    "phone": "+90 232 293 12 00",
    "address": "Mimar Sinan Mahallesi 9 Eylül Meydanı No:9/1 Kültürpark içi 1 no'lu Hol KONAK İZMİR TÜRKİYE",
    "complaintCount": 0,
    "color": "red",
    "logo": "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64px/10122.1.8.0.png",
    "username": "ızmir-buyuksehir-belediyesi",
    "about": "İzmir Büyükşehir Belediyesi",
    "type": "CORPORATE"
  }
 */
export interface CorporateUserDetail {
  id: number;
  name: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  complaintCount: number;
  color: string;
  logo: string;
  username: string;
  about: string;
  type: string;
}
