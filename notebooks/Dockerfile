FROM jupyter/minimal-notebook:latest

MAINTAINER Jupyter Project <jupyter@googlegroups.com>

USER root

RUN apt-get update && \
    apt-get install -y curl && \ 
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash - && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential libzmq3-dev

RUN npm install -g ijavascript 
USER jovyan
RUN  ijs --ijs-install=local
