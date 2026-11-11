
pipeline {
    agent any

    environment {
        IMAGE_NAME = "abhiraj25/foodies-react"
        CONTAINER_NAME = "foodies-react-container"
        APP_PORT = "8086"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Foodies React project'
                checkout scm
            }
        }

        stage('Validate Files') {
            steps {
                sh '''
                    test -f Dockerfile
                    test -f package.json
                    test -f Jenkinsfile
                    echo "Project files verified"
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Docker Hub Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'foodies-dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" --password-stdin

                        docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                        docker push ${IMAGE_NAME}:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true

                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p ${APP_PORT}:80 \
                        ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    sleep 5
                    docker exec ${CONTAINER_NAME} \
                        wget -qO- http://localhost/ > /dev/null

                    echo "Foodies React deployment successful!"
                '''
            }
        }
    }

    post {
        success {
            echo 'Foodies React CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
