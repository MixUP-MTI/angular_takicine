FROM maven:3.8-openjdk-17-slim as maven
WORKDIR /tmp/build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:17-slim
WORKDIR /allo_cine
COPY --from=maven /tmp/build/target/*.jar app.jar
COPY src/main/resources/assets ./assets
ENTRYPOINT ["java", "-jar", "app.jar"]
