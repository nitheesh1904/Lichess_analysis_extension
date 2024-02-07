import berserk
import token
import math
token="lip_gWCUnKvEmw4fQJItSMOB"
session = berserk.TokenSession(token)
client = berserk.Client(session=session)

def params(id):
  game=client.games.export(game_id='Oz1Hwqz0',as_pgn=False)
  results=[]
  results.append(game['players']['white']['analysis'])
  results.append(game['players']['black']['analysis'])
  return results

def accuracy(id):
  game=client.games.export(game_id='Oz1Hwqz0',as_pgn=False)
  f=[]
  for d in game['analysis']:
    if(len(d)==1):
      f.append(d)
    else:
      first_key = next(iter(d))
      f.append({first_key: d[first_key]})

  def win_percent(key,value):
    if(key=='mate'):
      return 100  
    else:
      return 50 + 50 * (2 / (1 + math.exp(-0.00368208 * value)) - 1)

  win =[50]
  for eval in f:
    for key,value in eval.items():
      win.append(win_percent(key,value))

  def accuracy(before,after):
    if(after>=before):
      return 100
    return 103.1668 * math.exp(-0.04354 * (before - after)) - 3.1669

  acc_white=[]
  for i in range(0,len(win)-1,2):
    acc_white.append(accuracy(win[i],win[i+1]))

  acc_black=[]
  for i in range(1,len(win)-1,2):
    acc_black.append(accuracy((100-win[i]),(100-win[i+1])))
  accuracies=[]
  accuracies.append(acc_black)
  accuracies.append(acc_white)
  return accuracies

info=params(id)
accuracies=accuracy(id)