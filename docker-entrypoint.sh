#!/bin/sh

# this if will check if the first argument is a flag
# but only works if all arguments require a hyphenated flag
# -v; -SL; -f arg; etc will work, but not arg1 arg2
echo "Starting from entrypoint"

# yarn build
JSON_STRING=$(jq -n -c \
    --arg api "$REACT_APP_API_HOST" \
    '{REACT_APP_API_HOST: $api}')
echo "s#__PROD_ENV__#$JSON_STRING#"

#sed -e "s#__PROD_ENV__#${JSON_STRING}#" /var/www/build/index_model.html > /var/www/build/index.html
echo "window.prod_env = $JSON_STRING" > /var/www/build/env.js
if [ "$#" -eq 0 ] || [ "${1#-}" != "$1" ]; then
    echo "Starting server"
    pwd
    set -- nginx "$@"
fi

# check for the expected command
if [ "$1" = 'yarn' ]; then
    shift
    exec yarn "$@"
fi

if [ "$1" = 'nginx' ]; then
    shift
    echo "Starting server $@"
    pwd
    exec nginx "$@"
fi


# else default to run whatever the user wanted like "bash" or "sh"
exec "$@"
