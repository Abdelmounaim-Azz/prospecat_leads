import flask
from flask import request, jsonify
from Email_Finder import *
from scrape_criteria import *
app = flask.Flask(__name__)
app.config["DEBUG"] = False
health_status = True


def check(apikey):
    return True


@app.route('/healthz')
def health():
    if health_status:
        resp = jsonify(health="healthy")
        resp.status_code = 200
    else:
        resp = jsonify(health="unhealthy")
        resp.status_code = 500

    return resp


@app.route('/api/leads/criteria', methods=['GET'])
def criteria():
    jobTitle = request.args.get('jobTitle', "")
    domain = request.args.get('domain', "")
    certification = request.args.get('certification', "")
    apikey = request.args.get('api', "")
    resnum = int(request.args.get('resnum', 7))
    if jobTitle == "" or domain == "" or certification == "":
        return jsonify({"success": 0, "result": {"error": "Error: Not all requered field provided. Please specify your api key ,job title,certification and company domain."}})
    if check(apikey):
        return jsonify(criteria_results(jobTitle, domain, certification, resnum))
    else:
        return jsonify({"success": 0, "result": {"error": "your not allowed"}})


@app.route('/api/leads/findperson', methods=['GET'])
def findperson():

    name = request.args.get('name', "")
    domain = request.args.get('domain', "")
    apikey = request.args.get('api', "")
    if name == "" or domain == "":
        return jsonify({"success": 0, "result": {"error": "Error: Not all requered field provided. Please specify your api key ,the person full name and company domain."}})

    if check(apikey):
        rep = personfind(name, domain)
        return jsonify(rep)

    else:
        return jsonify({"success": 0, "result": {"error": "your not allowed"}})


@app.route('/api/leads/company_email', methods=['GET'])
def company_email():

    country = request.args.get('country', "maroc")
    domain = request.args.get('domain', "")
    resnum = int(request.args.get('resnum', 10))
    apikey = request.args.get('api', "")

    if domain == "":
        return jsonify({"success": 0, "result": {"error": "Error: Not all requered field provided. Please specify your api key , the person full name and company domain."}})

    if check(apikey):
        return jsonify(companyfind(domain, country, resnum))

    else:
        return jsonify({"success": 0, "result": {"error": "your not allowed"}})


@app.route('/api/leads/acc_company_email', methods=['GET'])
def acc_company_email():

    country = request.args.get('country', "maroc")
    domain = request.args.get('domain', "")
    resnum = int(request.args.get('resnum', 5))
    apikey = request.args.get('api', "")

    if domain == "":
        return jsonify({"success": 0, "result": {"error": "Error: Not all requered field provided. Please specify your api key , the person full name and company domain."}})

    if check(apikey):
        return jsonify(accurate_companyfind(domain, country, resnum))

    else:
        return jsonify({"success": 0, "result": {"error": "your not allowed"}})


@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"success": 0, "result": {"error": "The resource could not be found"}})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000)
