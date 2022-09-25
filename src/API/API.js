/****************************************
     FETCH API
****************************************/
export async function fetchAPI(apiLink) {
  const link = 'http://data.nba.net/10s';
  const api = await fetch(link + apiLink);
  const response = await api.json();
  const data = await response;
  return data;
}

export async function API() {
  const {links} = await fetchAPI('/prod/v1/today.json');
  return links;
}

export async function seasonYear() {
  const links = await API();
  const scheduleAPI = await fetchAPI(links.leagueSchedule)
  const {league: {standard: schedule}} = await scheduleAPI;
  const gameDates = await schedule.map(game => new Date(game.startTimeUTC).valueOf());
  const firstGame = new Date(Math.min(...gameDates));

  const seasonYear =
    firstGame <= new Date() ? firstGame.getFullYear() : firstGame.getFullYear() - 1;
    return seasonYear
}
/****************************************
     SEASON YEAR
****************************************/
// prettier-ignore
// const getSeasonYear = async () => {
//   const {league: {standard: schedule}} = await fetchAPI(leagueSchedule);
//   const gameDates = await schedule.map(game => new Date(game.startTimeUTC).valueOf());
//   const firstGame = new Date(Math.min(...gameDates));

// const seasonYear =
//     firstGame <= new Date() ? firstGame.getFullYear() : firstGame.getFullYear() - 1;

//
//  }

// const seasonYear = getSeasonYear();

// /****************************************
//        TEAMS API
// ****************************************/
// export async function teamsAPI(setError) {
//   try {
//     // prettier-ignore
//     const {league: {standard: teamsObj}} = await fetchAPI(teamsLink);
//     const teams = teamsObj.filter(team => team.isNBAFranchise == true);
//     teams.forEach(team => (team.seasonYear = seasonYear));
//     return teams;
//   } catch (e) {
//     const message = `Something went wrong, please reload the page! \n ${e.message}`;
//     setError({failedLoad: true, message});
//     console.error(message);
//   }
// }

// /****************************************
//      TEAM INFORMATION
// ****************************************/
// export const teamInfoAPI = async teams => {
//   try {
//     /************** Rosters **************/
//     teams.forEach(async team => {
//       const rosterLink = teamRoster.replace('{{teamUrlCode}}', team.urlName);

//       // prettier-ignore
//       const {league: {standard:{players: rosterObj}}} = await fetchAPI(rosterLink);
//       const roster = await rosterObj.map(player => player.personId);
//       team.roster = roster;
//     });

//     /************** Leaders **************/
//     teams.forEach(async team => {
//       const leadersLink = teamLeaders2
//         .replace('{{teamId}}', team.teamId)
//         .replace(currentYear, seasonYear);

//       // prettier-ignore
//       const {league: {standard: leaders}} = await fetchAPI(leadersLink);
//       team.leaders = leaders;
//     });

//     /************** Standings **************/
//     // prettier-ignore
//     const {league: {standard: {teams: teamStandings}}} = await fetchAPI(leagueMiniStandings);
//     teams.forEach(team => {
//       teamStandings.forEach(standings => {
//         if (standings.teamId == team.teamId) team.standings = standings;
//       });
//     });

//     /************** Stats **************/
//     const statsLink = leagueTeamStatsLeaders.replace(currentYear, seasonYear);
//     // prettier-ignore
//     const {league: {standard: {regularSeason: {teams: teamStats}}}} = await fetchAPI(statsLink);
//     teams.forEach(team => {
//       teamStats.forEach(stats => {
//         if (stats.teamId == team.teamId) team.teamStats = stats;
//       });
//     });
//   } catch (e) {
//     const message = `Unable to load team information \n ${e.message}`;
//     console.error(message);
//   }
// };

// /****************************************
//      CAOCHES API
// ****************************************/
// export async function coachesAPI() {
//   try {
//     const {
//       league: {standard: coaches},
//     } = await fetchAPI(leagueRosterCoaches);

//     return coaches;
//   } catch (e) {
//     console.log(e.message);
//   }
// }

// /****************************************
//      PLAYERS API
// ****************************************/
// export async function playersAPI(setError) {
//   try {
//     const {
//       league: {standard: players},
//     } = await fetchAPI(leagueRosterPlayers);

//     return players;
//   } catch (e) {
//     const message = `Failed to load players. Please reload page! \n ${e.message}`;
//     setError({failedLoad: true, message});
//     console.log(message);
//   }
// }

// /****************************************
//      PLAYER INFORMATION
// ****************************************/
// export const playerInfoAPI = players => {
//   try {
//     players.forEach(async player => {
//       // prettier-ignore
//       const {league: {standard: {stats}}} = await fetchAPI(playerProfile.replace('{{personId}}', player.personId));
//       player.stats = stats;
//       const currentSeason = [stats.latest, ...stats.regularSeason.season].filter(
//         season => season.seasonYear == seasonYear
//       )[0];

//       player.stats.currentSeason = currentSeason || {};
//     });
//   } catch (e) {
//     const message = `Failed to load player profile! \n ${e.message}`;
//     setError({
//       failedLoad: false,
//       message: '',
//     });

//     console.error(message);
//   }
// };

// /****************************************
//      GET API IMAGES
// ****************************************/
// export const getImg = (id, type = 'small', className = '') => {
//   const smallImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`;
//   const largeImg = `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`;
//   const logo = `https://cdn.nba.com/logos/nba/${id}/global/L/logo.svg`;
//   const fallBack = 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png';

//   const imgUrl = type === 'logo' ? logo : type === 'large' ? largeImg : smallImg;
//   const onError = e => {
//     if (type !== 'logo') {
//       e.target.onerror = null;
//       e.target.src = fallBack;
//     } else return;
//   };

//   return <img src={imgUrl} className={className} onError={onError} />;
// };
