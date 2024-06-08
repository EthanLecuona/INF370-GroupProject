export interface Coordinates{
    lat: number
    lng: number
}

export interface PlaceLoc extends Coordinates{
    address: string
    staticMap: string
}