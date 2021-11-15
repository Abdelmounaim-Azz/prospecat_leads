docker build -t abdelmounaimazz/frontend-depl-prospecat:latest -t abdelmounaimazz/frontend-depl-prospecat:$SHA -f ./client/Dockerfile ./client
docker build -t abdelmounaimazz/auth-depl-prospecat:latest -t abdelmounaimazz/auth-depl-prospecat:$SHA -f ./auth/Dockerfile ./auth
docker build -t abdelmounaimazz/payment-depl-prospecat:latest -t abdelmounaimazz/payment-depl-prospecat:$SHA -f ./payment/Dockerfile ./payment
docker build -t abdelmounaimazz/leads-depl-prospecat:latest -t abdelmounaimazz/leads-depl-prospecat:$SHA -f ./leads/Dockerfile ./leads

docker push abdelmounaimazz/frontend-depl-prospecat:latest
docker push abdelmounaimazz/auth-depl-prospecat:latest
docker push abdelmounaimazz/payment-depl-prospecat:latest
docker push abdelmounaimazz/leads-depl-prospecat:latest

docker push abdelmounaimazz/frontend-depl-prospecat:$SHA
docker push abdelmounaimazz/auth-depl-prospecat:$SHA
docker push abdelmounaimazz/payment-depl-prospecat:$SHA
docker push abdelmounaimazz/leads-depl-prospecat:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-depl client=abdelmounaimazz/frontend-depl-prospecat:$SHA
kubectl set image deployments/auth-depl auth=abdelmounaimazz/auth-depl-prospecat:$SHA
kubectl set image deployments/leads-depl leads=abdelmounaimazz/leads-depl-prospecat:$SHA
kubectl set image deployments/payments-depl payments=abdelmounaimazz/payment-depl-prospecat:$SHA