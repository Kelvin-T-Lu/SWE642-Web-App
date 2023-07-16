FROM jenkins/jenkins:lts-jdk11
USER root
RUN apt update && \
    apt install -y snapd
RUN systemctl status snapd

RUN snap install kubectl --classic

COPY config config
USER jenkins
