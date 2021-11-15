from bs4 import BeautifulSoup
from Email_Finder import getpage
scraperapi_key = ""


def scrape_criteria(jobTitle, domain, certification, start=0):
    url = 'https://www.google.com/search?q=site%3Alinkedin.com%2Fin+{}+{}+{}&num=100&start={}'.format(
        domain, certification, jobTitle, start)
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


def criteria_results(jobTitle, domain, certification, resnum):
    start = 0
    rep = []
    while len(rep) < resnum:
        success, names, jobs = scrape_criteria(
            jobTitle, domain, certification, start)
        start += 100
        if success:
            for i in range(len(names)):
                rep.append(
                    {"name": names[i], "job": jobs[i]})
                if len(rep) >= resnum:
                    break
        else:
            print("couldnt find more result")
            break
    if len(rep) == 0:
        return {"success": 0, "result": {"error": "couldnt find any email"}}
    return {"success": 1, "emails": rep, "emails_number": len(rep), "domain": domain}
