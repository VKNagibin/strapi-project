build-app:
	docker build -t ws-dev/node-web-app .

run-app:
	docker run --restart always --env-file ./.env -p 3500:3000 -d ws-dev/node-web-app
