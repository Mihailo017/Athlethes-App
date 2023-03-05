import { Place } from './place';
import { Sport } from './sport';

export class Player extends Object {
    username!: string; // redundant
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    playerCity!: string;
    playerAddress!: string; // redundant
    favSports!: Sport[];
    favPlaces!: Place[];
    favTimeslots!: string[];
}