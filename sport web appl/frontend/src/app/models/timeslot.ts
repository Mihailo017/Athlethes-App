import { TeamInfo } from './teamInfo';

export class Timeslot extends Object {
    place!: string;
    date!: Date;
    time!: string;
    sport!: string;
    ground!: number;
    t1!: TeamInfo[];
    t2!: TeamInfo[];
}