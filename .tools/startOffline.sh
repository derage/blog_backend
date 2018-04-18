
ZOMBIE=false

OPTS=`getopt -o z: --long zombie: -n 'parse-options' -- "$@"`

if [ $? != 0 ] ; then echo "Failed parsing options." >&2 ; exit 1 ; fi

while true; do
  case "$1" in
    -z | --zombie ) ZOMBIE=true; shift ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

if [ $ZOMBIE == false ]; then
    serverless offline start
else
    TMPFILE=/var/tmp/offline$$.log
    if [ -f .offline.pid ]; then
        echo "Found file .offline.pid. Not starting."
        exit 1
    fi

    serverless offline start 2>1 > $TMPFILE &
    PID=$!
    echo $PID > .offline.pid

    while ! grep "Offline listening" $TMPFILE
    do sleep 1; done

    rm $TMPFILE
fi