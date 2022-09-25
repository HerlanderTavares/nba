# API Calls

## Main
http://data.nba.net/10s/prod/v1/today.json

## Images
https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{{playerId}}.png

## Large Images
https://cdn.nba.com/headshots/nba/latest/1040x760/{{playerId}}.png

## Fall Back Image
https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png

## Team Logos
http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/#{triCode}.png

New Link
https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg

## Team Colors
const {hex} = getMainColor(GSW);

## All Links:

allstarRoster:                  /prod/v1/allstar/2018/AS_roster.json
anchorDate:                     20220923
boxscore:                       /prod/v1/{{gameDate}}/{{gameId}}_boxscore.json
calendar:                       /prod/v1/calendar.json
currentDate:                    20220923
currentScoreboard:              /prod/v1/20220923/scoreboard.json
gameBookPdf:                    /prod/v1/{{gameDate}}/{{gameId}}_Book.pdf
leadTracker:                    /prod/v1/{{gameDate}}/{{gameId}}_lead_tracker_{{periodNum}}.json
leagueConfStandings:            /prod/v1/current/standings_conference.json
leagueDivStandings:             /prod/v1/current/standings_division.json
leagueLastFiveGameTeamStats:    /prod/v1/2022/team_stats_last_five_games.json
leagueMiniStandings:            /prod/v1/current/standings_all_no_sort_keys.json
leagueRosterCoaches:            /prod/v1/2022/coaches.json
leagueRosterPlayers:            /prod/v1/2022/players.json
leagueSchedule:                 /prod/v1/2022/schedule.json
leagueTeamStatsLeaders:         /prod/v1/2022/team_stats_rankings.json
leagueUngroupedStandings:       /prod/v1/current/standings_all.json
miniBoxscore:                   /prod/v1/{{gameDate}}/{{gameId}}_mini_boxscore.json
pbp:                            /prod/v1/{{gameDate}}/{{gameId}}_pbp_{{periodNum}}.json
playerGameLog:                  /prod/v1/2022/players/{{personId}}_gamelog.json
playerProfile:                  /prod/v1/2022/players/{{personId}}_profile.json
playerUberStats:                /prod/v1/2022/players/{{personId}}_uber_stats.json
playoffSeriesLeaders:           /prod/v1/2019/playoffs_{{seriesId}}_leaders.json
playoffsBracket:                /prod/v1/2019/playoffsBracket.json
previewArticle:                 /prod/v1/{{gameDate}}/{{gameId}}_preview_article.json
recapArticle:                   /prod/v1/{{gameDate}}/{{gameId}}_recap_article.json
scoreboard:                     /prod/v2/{{gameDate}}/scoreboard.json
teamICS:                        /prod/teams/schedules/2022/{{teamUrlCode}}_home_schedule.ics
teamICS2:                       /prod/teams/schedules/2022/{{teamUrlCode}}_schedule.ics
teamLeaders:                    /prod/v1/2022/teams/{{teamUrlCode}}/leaders.json
teamLeaders2:                   /prod/v1/2022/teams/{{teamId}}/leaders.json
teamRoster:                     /prod/v1/2022/teams/{{teamUrlCode}}/roster.json
teamSchedule:                   /prod/v1/2022/teams/{{teamUrlCode}}/schedule.json
teamScheduleYear:               /prod/v1/{{seasonScheduleYear}}/teams/{{teamUrlCode}}/schedule.json
teamScheduleYear2:              /prod/v1/{{seasonScheduleYear}}/teams/{{teamId}}/schedule.json
teams:                          /prod/v2/2022/teams.json
teamsConfig:                    /prod/2022/teams_config.json
teamsConfigYear:                /prod/{{seasonScheduleYear}}/teams_config.json
ticketLink:                     https://a.data.nba.com/tickets/single/{{seasonScheduleYear}}/{{gameId}}/{{trackingId}}
todayScoreboard:                /prod/v1/20220923/scoreboard.json
universalLinkMapping:           https://www.nba.com/mobile/apps/configs/prod/universalLinkMapping.json
