export interface AlbumSaleModel {
    id?: number
    name: string
    idSpotify: string
    artistName: string
    imageUrl: string
    value: number
    users?: Users
  }
  
  export interface Users {
    id: number
    email: string
    password: string
  }
  