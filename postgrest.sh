#!/bin/bash
#change path to whereever postgrest is installed
nohup
/home/chas/./postgrest postgres://c5fritz1387:password@localhost:5432/birchtest -a postgres -s public -p 5000 
