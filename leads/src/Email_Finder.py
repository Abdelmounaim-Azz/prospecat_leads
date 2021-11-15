import requests
from bs4 import BeautifulSoup
import json
import time
import urllib.parse
import hashlib

debounce_apikey = ""
scraperapi_key = ""


validacc = 100
catchallacc = 75
unkownacc = 50
invalidacc = 0

patternslist = ["fn.ln", "ln.fn", "fi.ln", "fn.li", "li.fn", "ln.fi", "fn", "ln", "fnln", "lnfn", "filn", "lnfi", "fnli",
                "lifn", "fn-ln", "fi-ln", "fn-li", "ln-fn", "ln-fi", "li-fn", "fn_ln", "fi_ln", "fn_li", "ln_fn", "ln_fi", "li_fn"]

# patternslist=["fn.ln","ln.fn","fi.ln","fn.li","li.fn","ln.fi","fn","ln","fnln","lnfn","filn","lnfi","fnli","fili","lifn","fi.li","lifi","li.fi","fn-ln","fi-ln","fn-li","fi-li","ln-fn","ln-fi","li-fn","li-fi","fn_ln","fi_ln","fn_li","fi_li","ln_fn","ln_fi","li_fn","li_fi"]


def verify_email(email):
    # return success,accuracy
    # success :if there are any problem connecting with the verification api
    payload = {'api': debounce_apikey, 'email': email}
    try:
        r = requests.get('https://api.debounce.io/v1/', params=payload)
    except requests.exceptions.RequestException as e:
        print(e)
        print("a problem occured while verifing email trying again in 1s")
        time.sleep(1)
        try:
            r = requests.get('https://api.debounce.io/v1/', params=payload)
        except requests.exceptions.RequestException as e2:
            print(e2)
            print(
                "a problem occured again while verifing email returning default pattern")
            return False, unkownacc

    json_data = json.loads(r.text)
    print(json_data)
    if(json_data["success"] == '0'):
        print("error response :" +
              json_data["debounce"]["error"]+" trying again after 3s")
        time.sleep(3)
        r = requests.get('https://api.debounce.io/v1/', params=payload)
        json_data = json.loads(r.text)

        if(json_data["success"] == '0'):
            print("couldn't fix the problem error response :" +
                  json_data["debounce"]["error"]+" returning default patern")
            return False, unkownacc

    if(int(json_data["balance"]) < 10):
        print("balance ={}!!!".format(json_data["balance"]))

    code = json_data["debounce"]["code"]
    if code == "5":
        return True, validacc  # valid email
    elif code == "4":
        return True, catchallacc  # catchall
    elif code == "1" or code == "6":
        return True, invalidacc  # not an email or invalid email
    else:
        return True, unkownacc  # unkown


def generate_email(name, pattern, domain):

    first_name, last_name = name.split()
    first_initial = first_name[0]
    last_initial = last_name[0]

    if pattern == "fn.ln":
        return first_name + '.' + last_name + '@' + domain
    if pattern == "ln.fn":
        return last_name + '.' + first_name + '@' + domain
    if pattern == "fi.ln":
        return first_initial + '.' + last_name + '@' + domain
    if pattern == "fn.li":
        return first_name + '.' + last_initial + '@' + domain
    if pattern == "li.fn":
        return last_initial + '.' + first_name + '@' + domain
    if pattern == "ln.fi":
        return last_name + '.' + first_initial + '@' + domain
    if pattern == "fn":
        return first_name + '@' + domain
    if pattern == "ln":
        return last_name + '@' + domain
    if pattern == "fnln":
        return first_name + last_name + '@' + domain
    if pattern == "lnfn":
        return last_name + first_name + '@' + domain
    if pattern == "filn":
        return first_initial + last_name + '@' + domain
    if pattern == "lnfi":
        return last_name + first_initial + '@' + domain
    if pattern == "fnli":
        return first_name + last_initial + '@' + domain
    if pattern == "lifn":
        return last_initial + first_name + '@' + domain
    if pattern == "fn-ln":
        return first_name + '-' + last_name + '@' + domain
    if pattern == "fi-ln":
        return first_initial + '-' + last_name + '@' + domain
    if pattern == "fn-li":
        return first_name + '-' + last_initial + '@' + domain
    if pattern == "ln-fn":
        return last_name + '-' + first_name + '@' + domain
    if pattern == "ln-fi":
        return last_name + '-' + first_initial + '@' + domain
    if pattern == "li-fn":
        return last_initial + '-' + first_name + '@' + domain
    if pattern == "fn_ln":
        return first_name + '_' + last_name + '@' + domain
    if pattern == "fi_ln":
        return first_initial + '_' + last_name + '@' + domain
    if pattern == "fn_li":
        return first_name + '_' + last_initial + '@' + domain
    if pattern == "ln_fn":
        return last_name + '_' + first_name + '@' + domain
    if pattern == "ln_fi":
        return last_name + '_' + first_initial + '@' + domain
    if pattern == "li_fn":
        return last_initial + '_' + first_name + '@' + domain
    if pattern == "li_fi":
        return last_initial + '_' + first_initial + '@' + domain
    if pattern == "fili":
        return first_initial + last_initial + '@' + domain
    if pattern == "fi.li":
        return first_initial + '.' + last_initial + '@' + domain
    if pattern == "lifi":
        return last_initial + first_initial + '@' + domain
    if pattern == "li.fi":
        return last_initial + '.' + first_initial + '@' + domain
    if pattern == "fi-li":
        return first_initial + '-' + last_initial + '@' + domain
    if pattern == "li-fi":
        return last_initial + '-' + first_initial + '@' + domain
    if pattern == "fi_li":
        return first_initial + '_' + last_initial + '@' + domain

    print("couldnt find this pattern consider adding it to the code above ")
    return first_name + '.' + last_name + '@' + domain


def find_format(name, domain, pattern=""):

    if pattern != "":
        email = generate_email(name, pattern, domain)
        succ, acc = verify_email(email)
        if succ & acc > unkownacc:
            return pattern, email, acc
        if not(succ):
            print("couldnt verify emails format, using {} pattern".format(pattern))
            return pattern, email, acc

    for pattern in patternslist:
        email = generate_email(name, pattern, domain)
        succ, acc = verify_email(email)
        if succ and acc >= catchallacc:
            return pattern, email, acc
        if not(succ):
            print("couldnt verify emails format, using default pattern")
            return "fn.ln", generate_email(name, "fn.ln", domain), acc

    print("couldnt find any valid email pattern, using default pattern")
    return "fn.ln", generate_email(name, "fn.ln", domain), unkownacc


def getpage(url):
    payload = {'api_key': scraperapi_key, 'url': url, 'render': 'true'}
    try:
        r = requests.get('http://api.scraperapi.com', params=payload)

    except requests.exceptions.RequestException as e:
        print("a problem occured while getting pages trying again in 1s")
        print(e)
        time.sleep(1)
        try:
            r = requests.get('http://api.scraperapi.com', params=payload)
        except requests.exceptions.RequestException as e2:
            print("a problem occured again while getting page")
            print(e2)
            return False, "error"

    return True, r


def scrape(domain, country="maroc", start=0):
    url = 'https://www.google.com/search?q=site%3Alinkedin.com%2Fin+{}+{}&num=100&start={}'.format(
        domain, country, start)
    print("scrapping url "+url)
    success, r = getpage(url)
    if not(success):
        return False, [], []

    soup = BeautifulSoup(r.text, "html.parser")
    results = soup.find_all('div', class_='tF2Cxc')

    if len(results) == 0:
        print("couldnt find any result trying again")
        success, r = getpage(url)
        if not(success):
            return False, [], []
        soup = BeautifulSoup(r.text, "html.parser")
        results = soup.find_all('div', class_='tF2Cxc')

    if len(results) == 0:
        print("couldnt find any result")
        return False, [], []
    names = []
    jobs = []
    for result in results:
        result_clean = result.find('h3', class_='LC20lb').text.lower()
        res_list = result_clean.split(' - ')
        if(len(res_list) < 2):
            continue
        name = res_list[0].strip()
        sp_name = name.split(' ')
        if len(sp_name) != 2:
            continue
        job_title = res_list[1].strip()
        names.append(name)
        jobs.append(job_title)
    return True, names, jobs


def generate(names, jobs, pattern, domain):
    rep = []
    for i in range(len(names)):
        email = generate_email(names[i], pattern, domain)
        rep.append({"name": names[i], "job": jobs[i], "email": email})
    return {"success": 1, "result": {"emails": rep, "emails_number": len(rep), "pattern": pattern}}


def companyfind(domain, country, resnum):
    names, jobs = [], []
    start = 0
    while len(names) < resnum:
        success, noms, travails = scrape(domain, country, start)

        start += 100
        if success:
            names += noms
            jobs += travails
        else:
            print("couldnt find more result")
            break
    if len(names) != 0:
        name = names[0]
        print("finding "+name+" email")
        pattern, _, acc = find_format(name, domain)
        return generate(names[:resnum], jobs[:resnum], pattern, domain)
    return {"success": 0, "result": {"error": "couldnt find any email'"}}


def accurate_companyfind(domain, country, resnum):

    pattern = ""
    start = 0
    iscatchall = False
    cantfindorverify = False
    skipped = 0
    flag = 2  # stop after failling to find many people email address successively to avoid wasting api credit
    rep = []
    while len(rep) < resnum:
        success, names, jobs = scrape(domain, country, start)
        start += 100
        if success:
            for i in range(len(names)):
                if not(iscatchall or cantfindorverify):
                    pattern, email, acc = find_format(
                        names[i], domain, pattern)
                    if acc < catchallacc:
                        skipped += 1
                        if skipped >= flag:
                            cantfindorverify = True
                        continue
                    rep.append(
                        {"name": names[i], "job": jobs[i], "email": email, "accuracy": acc})
                    skipped = 0

                    if acc == catchallacc:
                        iscatchall = True

                    if len(rep) >= resnum:
                        break
                else:
                    break

        else:
            print("couldnt find more result")
            break

    if len(rep) == 0:
        return {"success": 0, "result": {"error": "couldnt find any email"}}

    return {"success": 1, "result": {"emails": rep, "iscatchall": iscatchall, "emails number": len(rep)}}


def personfind(name, domain):

    _, email, accur = find_format(name, domain)
    gravatar_url = "https://www.gravatar.com/avatar/" + \
        hashlib.md5(email.lower().encode('utf-8')).hexdigest()
    gravatar_url += urllib.parse.urlencode({'s': "200",
                                            'r': "pg",
                                            'd': "mm", })
    if accur > unkownacc:
        return {"success": 1, "result": {"name": name, "domain": domain, "email": email, "accuracy": accur, "avatar": gravatar_url}}
    else:
        return {"success": 0, "result": {"error": "couldnt find any email"}}
