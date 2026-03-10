pipeline {
    agent any

    stages {

        stage('Check Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Check Docker') {
            steps {
                sh 'docker --version'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker run --rm \
                -v /var/run/docker.sock:/var/run/docker.sock \
                -v $PWD:/app \
                -w /app \
                docker/compose:latest build
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                docker run --rm \
                -v /var/run/docker.sock:/var/run/docker.sock \
                -v $PWD:/app \
                -w /app \
                docker/compose:latest up -d
                '''
            }
        }

    }
}
