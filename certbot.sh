if [ -f .env ]; then
    # shellcheck disable=SC2046
    # shellcheck disable=SC2002
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

sudo apt update
sudo apt install snapd

sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

certbot certonly --standalone -d "$DOMAIN"

(crontab -l ; echo "@daily certbot renew --pre-hook \"docker-compose -f $PWD down\" --post-hook \"docker-compose -f $PWD up -d\"")| crontab -
