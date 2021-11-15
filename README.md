# Prospecat

**Prospecat** is a B2B prospecting platform. Use it to find email addresses and build a quality B2B Data for your sales funnel.

## App architecture

![Architecture](https://i.ibb.co/5GyfMQ1/68747470733a2f2f692e6962622e636f2f52636b793458642f7361686166726963612d6172636869746563747572652e706e.png)

## code sharing

all services share some logic between them,such as seeing if user loged in,custom error handling.[azz-prospecat](https://www.npmjs.com/package/azz-prospecat "common library") serves as a common library to share code with these services instead of just copy pasting.

---

## Demo

### Find Verified Email

![Find Email](demo/verified_email.gif)

### Criteria Search

![Find Leads](demo/criteria.gif)

### Find Email By Domain

![Find Leads](demo/domain.jpg)

### Authentification

![Sign In demo](demo/signin.gif)

### Payment plans

![Payment plans demo](demo/plans.gif)

### AWS Email notification

![AWS SES](demo/SES_EMAIL.png)

## Author

Abdelmounaim Azziza [@abdelmounaimazz](https://twitter.com/AbdelmounaimAzz "abdelmounaimazz").