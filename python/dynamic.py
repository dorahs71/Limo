from requests_html import HTMLSession
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('limo-movie-firebase-adminsdk-ad031-b387b2740b.json')

firebase_admin.initialize_app(cred)
db = firestore.client()

s = HTMLSession()

def request(url):
    r = s.get(url)
    r.html.render(timeout=20)
    return r.html.xpath('//*[@class="md-frgroup _static _index"]', first=True)
    

def parse(films):
    for film in films.absolute_links:
        r = s.get(film)
        poster_img = r.html.find('img.kp', first=True).attrs['src']
        title = r.html.find('h1.tt', first=True).text
        en_title = r.html.find('span.en', first=True).text
        ch_title = title.replace(en_title,'')
        director = r.html.find('dd.director', first=True).text
        rate = r.html.find('span.score', first=True).text
        if rate == '--':
            rate = 5.3


        cast_list=[]
        cast = r.html.find('section.cast')
        for item in cast:
            actorPhoto = item.find('img.fg-filter')
            actorName = item.find('h3.fg-title')
            en_actorName = item.find('span.fg-en')
            for i in range(len(actorName)):
                actorImg = actorPhoto[i].attrs['src']
                ch_actor = actorName[i].text.replace(en_actorName[i].text, '')
                en_actor = en_actorName[i].text
                cast = {
                    'chActor': ch_actor,
                    'enActor': en_actor,
                    'actorImg': actorImg,
                }
                cast_list.append(cast)

        length = r.html.find('dt.len+dd', first=True).text
        date = r.html.find('dt.resd+dd', first=True).text

        gallery_list=[]
        gallery = r.html.find('section.photos')
        for item in gallery:
            src = item.find('a')
            for i in range(len(src)):
                photo = src[i].attrs['href']
                gallery_list.append(photo)

        try: 
            trailerbtn = r.html.find('button.pre._prim', first=True)
            trailerkey = trailerbtn.attrs['data-embed']
        except:
            trailerkey = ''

        story = r.html.find('div.con', first=True).text
        director = r.html.find('dd.director', first=True).text

        value = db.collection('Movies').where('chTitle', '==', ch_title).get()
        if (len(list(value))):
            print(ch_title + " already exists")   
        else:
            newRef = db.collection('Movies').document().id

            film = {
            'movieId': newRef,
            'chTitle': ch_title,
            'enTitle': en_title,
            'poster': poster_img,
            'date': date,
            'length': length,
            'rate': '%.1f' % float(rate),
            'rateNum':500,
            'trailerKey': trailerkey,
            'director': director,
            'cast': cast_list,
            'story': story,
            'gallery': gallery_list,
            'movieTag': [],
            }

            db.collection('Movies').document(newRef).set(film)
            print(ch_title + " is saved")
       

films = request('https://www.agentm.tw/movie_list_now')
parse(films)






