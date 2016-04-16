# geojson-dashboard-DMS-node

```
git clone git@github.com:c5fritz1387/geojson-dashboard-DMS-node.git
curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
source ~/.profile
nvm ls-remote
nvm install v4.4.1
node --version
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local
cd geojson-dashboard-DMS-node/
npm install
npm install -g supervisor
npm start
```

# dump the db
```
pg_dump db_name > dump.sql
```

copy the file, dump.sql to somewhere you want it to go. on the new machine,

# create db
```
createdb -T template_postgis db_name
psql db_name < dump.sql
```
#start the process

````
nohup supervisor &
ps ax | grep super
nohup npm start &
tail -f nohup.out

`````
