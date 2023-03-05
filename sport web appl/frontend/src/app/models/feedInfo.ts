import { Place } from './place';
import { Player } from './player';
import { Sport } from './sport';
import { Timeslot } from './timeslot';

export class FeedInfo extends Object {
    timeslot!: Timeslot;
    tournament!: string;
    rating!: number;
    address!: string;
    time!: string;
    date!: string;
    friends!: Player[];
}