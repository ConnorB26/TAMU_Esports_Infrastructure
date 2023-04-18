#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 "$host"; do
  >&2 echo "$host is unavailable - waiting"
  sleep 1
done

>&2 echo "$host is up - executing command"
exec $cmd
