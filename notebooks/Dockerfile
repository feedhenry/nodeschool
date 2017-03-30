FROM jupyter/minimal-notebook:latest

MAINTAINER Jupyter Project <jupyter@googlegroups.com>

USER root

RUN apt-get update && \
    apt-get install -y curl && \ 
    curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y build-essential libzmq3-dev
RUN conda remove nodejs
RUN conda install -c damianavila82 rise
RUN npm install -g ijavascript 
RUN  jupyter-nbextension install rise --py --sys-prefix
RUN  jupyter-nbextension enable rise --py --sys-prefix
USER jovyan
RUN  ijs --ijs-install=local

