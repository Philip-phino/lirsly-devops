pipeline {
    agent any

    stages {

        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v $PWD:$PWD -w $PWD docker/compose:latest build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v $PWD:$PWD -w $PWD docker/compose:latest up -d'
            }
        }

    }
}
