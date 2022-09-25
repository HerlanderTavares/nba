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

export async function teamInfoAPI(state, teamsArr) {
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
    const teams = teamsArr;

    teams.forEach(async team => {
      // Rosters
      const rosterLink = teamRoster.replace('{{teamUrlCode}}', team.urlName);
      const rosterAPI = await fetchAPI(rosterLink);
      const roster = await rosterAPI.league.standard.players;
      team.roster = await roster.map(player => player.personId);

      // Leaders
      const leadersLink = teamLeaders2
        .replace('{{teamId}}', team.teamId)
        .replace(year, currentYear);
      const leadersAPI = await fetchAPI(leadersLink);
      const leaders = await leadersAPI.league.standard;
      team.leaders = leaders;

      // Standings
      const standingsAPI = await fetchAPI(standingsLink);
      const standings = await standingsAPI.league.standard.teams;
      standings.forEach(standing => {
        if (standing.teamId == team.teamId) team.standings = standing;
      });

      // Stats
      const statsLink = leagueTeamStatsLeaders.replace(year, currentYear);
      const statsAPI = await fetchAPI(statsLink);
      const stats = await statsAPI.league.standard.regularSeason.teams;
      stats.forEach(stat => {
        if (stat.teamId == team.teamId) team.teamStats = stat;
      });
    });

    state.setTeams(teams);
  } catch (e) {
    console.error(e.message);
  }
}
