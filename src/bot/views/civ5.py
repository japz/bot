from yardbird.irc import IRCResponse
from viewer.models import Image, Link
from bot.utils import parse_request
from bs4 import BeautifulSoup
import requests

def civ5(request):
    d = request.reply_recipient
    game_ids = ['10774','10775','14878']
    base_url = 'http://multiplayerrobot.com/Game#'
    response = ""
    for i in game_ids:
        data = requests.post(base_url + i, headers={'Content-Length': '0'})
        if data.status_code != 200:
            return IRCResponse(d, 'Unable to fetch game data')
        soup = BeautifulSoup(data.text)
        active_player = soup.find(class_='game-host').find(class_='avatar').attrs['title']
        turn_timer = soup.find(id='turn-timer-container').find('strong').string        
        response += "Game {0}: Active player: {1}, turn ends: {2}\n".format(i, active_player, turn_timer)
    return IRCResponse(d,response)

