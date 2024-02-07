import sys
import berserk
import token
import math
token="lip_gWCUnKvEmw4fQJItSMOB"
session = berserk.TokenSession(token)
client = berserk.Client(session=session)

id=sys.argv[1]
def params(id):
    token="lip_gWCUnKvEmw4fQJItSMOB"
    session = berserk.TokenSession(token)
    client = berserk.Client(session=session)
    game=client.games.export(game_id='Oz1Hwqz0',as_pgn=False)
    results=[]
    results.append(game['players']['white']['analysis'])
    results.append(game['players']['black']['analysis'])
    return results
par=params(id)
print(par)
sys.stdout.flush()