import {API, fetchAPI} from './API';

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
