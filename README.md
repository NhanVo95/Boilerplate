# The August

## Word with docker compose
To run a specific Docker Compose YAML file
```
docker-compose -f docker-compose-develop.yml up --build
docker compose -f docker-compose-develop.yml down -v 
```

```
docker-compose -f docker-compose-production.yml up --build
docker compose -f docker-compose-production.yml down -v 
```

```
docker-compose -f docker-compose-production.yml run --service-ports [service]
```
### Setup SSL
```
docker-compose -f docker-compose-production.yml run --rm certbot certonly --webroot --webroot-path=/var/www/certbot/ --email thanhnhan140395@gmail.com --agree-tos --no-eff-email --staging -d [domain.com]

docker-compose -f docker-compose-production.yml run --rm certbot renew
```

## Install PSReadLine for Windows Terminal Intellisense
```
Install-Module PSReadLine
Import-Module PSReadLine
Get-PSReadlineKeyHandler
```

```
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -HistoryNoDuplicates
Set-PSReadLineKeyHandler -Key Tab -Function Complete
```

## Work with git:
Viewing full version tree in git:
```
git log --pretty=oneline --graph --decorate --all
```

```
git config --local --add --bool push.autoSetupRemote true
```

```
git init
git add .
git reset <folder name>
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com
git push -u origin main
```

```
git branch develop
git checkout develop
```

```
git checkout -b feature/1-something
git push --set-upstream origin feature/1-something
git add .
git reset <folder name>
git commit -m "#1 - something"
git push

git merge feature/1-something
git push -d origin feature/1-something
git branch -d feature/1-something
```

## API list:
V1: