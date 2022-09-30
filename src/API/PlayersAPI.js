import {API, fetchAPI, seasonYear} from './API';

export async function playerAPI(state) {
  try {
    const links = await API();
    const {leagueRosterPlayers: playersLink} = links;
    const playersAPI = await fetchAPI(playersLink);
    const players = await playersAPI.league.standard;
    return players;
  } catch (e) {
    const message = `Something went wrong. Please reload the page! \n ${e.message}`;
    state.setError({message, failedLoading: true});
    console.log(message);
  }
}

export async function playerInfoAPI(playersArr) {
  try {
    const currentYear = await seasonYear();
    const links = await API();
    const {playerProfile} = links;

    const players = await Promise.all(
      playersArr.map(async player => {
        try {
          const statsLink = playerProfile.replace('{{personId}}', player.personId);
          const statsAPI = await fetchAPI(statsLink);
          const stats = await statsAPI.league.standard.stats;
          const allSeasons = [
            stats.latest,
            ...stats.regularSeason.season.map(season => ({
              ...season.total,
              seasonYear: season.seasonYear,
            })),
          ];

          const currentSeason = allSeasons.filter(season => season.seasonYear == currentYear)[0];

          return {id: player.personId, stats: {...stats, allSeasons, currentSeason}};
        } catch (e) {
          console.error(`Player ${player.personId} doesn't have a profile yet`);
          return {id: player.personId, stats: {}};
        }
      })
    );

    return players;
  } catch (e) {
    console.error(`This player doesnt have a profile \n ${e.message}`);
  }
}
