# Clover v3

Follow instructions here: [https://docs.honeyside.it/clover/](https://docs.honeyside.it/clover/)

**You can install Clover v3 in the same way as Clover v2, the above documentation is still valid.**

Makes sure that:
1. You need to own a domain name, such as `your-domain.com`.
2. Check DNS propagation for your domain with [https://dnschecker.org](https://dnschecker.org). Record A must be pointing at the ip address of your machine.

Done? All you have to do now is run the following:

```bash
./install.sh
```

Then follow instructions on screen.

### Alternative installation method - Docker

Clover v3 is now fully dockerized. If you are an experienced user and (for some reason) you prefer Docker, you can install it via Docker by following the next few steps. ***This is not recommended to unexperienced users and we will not provide installation services on Docker setups.*** 

### Setup - with Docker
1. `cp .env.example .env`
2. Edit the `.env` file according to your needs.
3. Install Docker and Docker Compose.
4. Run `./docker-install.sh` to build and install Clover.

### Adding SSL (required for meetings) - with Docker
1. You need to own a domain name, such as `your-domain.com`.
2. Check DNS propagation for your domain with [https://dnschecker.org](https://dnschecker.org). Record A must be pointing at the ip address of your machine.
3. Install certbot and generate certificates for your domain. On Ubuntu 20.04, you can do this by running `./cerbot.sh`. Run this only once.
4. Edit `proxy/nginx.conf` with SSL. Relevant lines: 23-25.
5. Restart by running `./restart.sh`.

### Important commands - with Docker
* Run `./docker-restart.sh` to reload configuration from `.env` file and restart Clover.
* Run `./docker-stop.sh` to shut down Clover.
* If you make changes to the source code, run `./install.sh` again to regenerate the docker images and restart.

### Installing an update (from v3.0.0-beta5 onwards) - with Docker
1. Overwrite existing files with new files (or git pull). Keep your old `.env` file.
2. Run `./docker-install.sh` - if you made changes to the source code, those will be discarded.
