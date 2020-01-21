import { RoundDate } from '~src/dataModel/RoundDate';
import { PlayerFixtureDate } from '~src/dataModel/PlayerFixtureDate';

export const validInvitationId: string = '08ce53d1-0688-46c0-80c4-d6fa1dc2dc86';

export const roundDate: RoundDate = {
    date: new Date('14 January 2020'),
    roundName: 'Cup Quarter Finals'
};

export const playerHomeFixture: PlayerFixtureDate = {
    date: new Date('25 January 2020'),
    roundName: 'Cup Semi Finals',
    home: 3,
    away: 2,
    awayTeam: 'The Treasury All Stars'
};

export const playerAwayFixture: PlayerFixtureDate = {
    date: new Date('1 February 2020'),
    roundName: 'League Game 25',
    home: 13,
    away: 3,
    homeTeam: 'Epic Tom'
};
