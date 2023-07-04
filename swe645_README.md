EC2 Homepage - https://ec2-3-92-221-242.compute-1.amazonaws.com/swe_klu21

.devconatiner - Use to build java enviroment container for VSCode.

Dockerfile - Build the docker image and deploy war file to a local docker instance.

Create and compile WAR file - 
    - Set up java enviroment.
    - Run jar -cvf swe_klu21.war *

Deploy WAR file (Windows) - 
    - Use SCP program to access EC2 instance.
    - Copy swe_klu21.war into /opt/bitnami/tomcat/webapps
    - Let the instance compile.

Deploy War File to a localized TomCat Container:
    - Build image with "docker build -t myapp ." 
    - Run container with "docker run -itd -p 8080:8080 --name my_application_container myapp"
    - Verify container works with "curl http://localhost:8080"
