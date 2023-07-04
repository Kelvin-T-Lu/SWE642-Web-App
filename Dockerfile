# FROM bitnami/tomcat
FROM tomcat:9.0-jdk15

COPY swe_klu21.war /usr/local/tomcat/webapps/
