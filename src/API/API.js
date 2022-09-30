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

export async function seasonYear(setDate = () => {}) {
  const links = await API();
  const scheduleAPI = await fetchAPI(links.leagueSchedule);
  // prettier-ignore
  const {league: {standard: schedule}} = await scheduleAPI;
  const gameDates = await schedule
    .filter(game => game.seasonStageId == 2)
    .map(game => new Date(game.startTimeUTC).valueOf());
  const firstGame = new Date(Math.min(...gameDates));

  const seasonYear =
    new Date().valueOf() >= firstGame.valueOf()
      ? firstGame.getFullYear()
      : firstGame.getFullYear() - 1;

  setDate(seasonYear);
  return seasonYear;
}

export const getImg = (id, type = 'small', className = '', value = 'image') => {
  const smallImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`;
  const largeImg = `https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`;
  const logo = `https://cdn.nba.com/logos/nba/${id}/global/L/logo.svg`;
  const fallBack = 'https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png';

  const imgUrl = type === 'logo' ? logo : type === 'large' ? largeImg : smallImg;
  const onError = e => {
    if (type !== 'logo') {
      e.target.onerror = null;
      e.target.src = fallBack;
    } else return;
  };

  const darkLogos = ['1610612763', '1610612751', '1610612762'];
  const darkLogoStyle = {
    filter:
      'drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(0 0 1px white)',
  };

  const isDark = darkLogos.includes(id) ? darkLogoStyle : {};

  if (value === 'link') return imgUrl;
  else return <img src={imgUrl} className={className} onError={onError} style={isDark} />;
};
