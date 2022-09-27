import {API, fetchAPI, seasonYear} from './API';

export async function teamAPI(state) {
  try {
    const links = await API();
    const {teams: teamsLink} = links;
    const teamsAPI = await fetchAPI(teamsLink);
    const teams = await teamsAPI.league.standard.filter(team => team.isNBAFranchise == true);
    return teams;
  } catch (e) {
    const message = `Something went wrong. Please reload the page! \n ${e.message}`;
    state.setError({message, failedLoading: true});
    console.error(message);
  }
}

export async function teamInfoAPI(teamsArr) {
  try {
    //Current Date
    const year = new Date().getFullYear();
    const currentYear = await seasonYear();

    // Links
    const links = await API();
    const {
      teamRoster,
      teamLeaders2,
      leagueMiniStandings: standingsLink,
      leagueTeamStatsLeaders,
    } = links;

    const teams = await Promise.all(
      teamsArr.map(async team => {
        // Rosters
        const rosterLink = teamRoster.replace('{{teamUrlCode}}', team.urlName);
        const rosterAPI = await fetchAPI(rosterLink);
        const rosterArr = await rosterAPI.league.standard.players;
        const roster = await rosterArr.map(player => player.personId);

        // Leaders
        const leadersLink = teamLeaders2
          .replace('{{teamId}}', team.teamId)
          .replace(year, currentYear);
        const leadersAPI = await fetchAPI(leadersLink);
        const leaders = await leadersAPI.league.standard;

        // Standings
        const standingsAPI = await fetchAPI(standingsLink);
        const standingsArr = await standingsAPI.league.standard.teams;
        const standings = await standingsArr.filter(standing => standing.teamId == team.teamId)[0];

        // Stats
        const statsLink = leagueTeamStatsLeaders.replace(year, currentYear);
        const statsAPI = await fetchAPI(statsLink);
        const statsArr = await statsAPI.league.standard.regularSeason.teams;
        const stats = await statsArr.filter(stat => stat.teamId == team.teamId)[0];

        return {
          id: team.teamId,
          roster,
          leaders,
          standings,
          stats,
        };
      })
    );

    return teams;
  } catch (e) {
    console.error(e.message);
  }
}
