#!/bin/sh

export VERSION=$(git rev-parse --short "$GITHUB_SHA")
export IMAGE=chusj/cqdg-portal-ui:$VERSION

docker build -t $IMAGE .

docker push $IMAGE