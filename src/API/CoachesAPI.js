import {API, fetchAPI} from './API';

export async function coachesAPI(state) {
  try {
    const links = await API();
    const {leagueRosterCoaches: coachesLink} = links;
    const coachesAPI = await fetchAPI(coachesLink);
    const coaches = await coachesAPI.league.standard;
    return coaches;
  } catch (e) {
    const message = `Something went wrong. Please reload the page! \n ${e.message}`;
    state.setError({message, failedLoading: true});
    console.log(message);
  }
}
