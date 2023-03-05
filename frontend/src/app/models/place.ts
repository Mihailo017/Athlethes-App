import { SportInfo } from './sportInfo';

export class Place extends Object {
    email!: string;
    password!: string;
    placeName!: string;
    placeCity!: string;
    placeSports!: SportInfo[];
}