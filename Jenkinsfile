pipeline {
    agent any

    stages {

        stage('Check Files') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Containers') {
            steps {
                sh 'docker compose -f docker-compose.yml build'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker compose -f docker-compose.yml up -d'
            }
        }

    }
}
