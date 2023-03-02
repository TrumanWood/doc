#!/bin/bash
echo "test \"\$*\""
for var in "$*"
do
  echo "$var"
done

echo "==============="
echo "test \"\$#\""
for var in "$@"
do
  echo "$var"
done