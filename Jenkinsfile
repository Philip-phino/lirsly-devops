pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/Philip-phino/lirsly-devops.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t lirsly-backend ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t lirsly-frontend ./frontend'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker run -d -p 5000:5000 --name backend lirsly-backend'
                sh 'docker run -d -p 3000:3000 --name frontend lirsly-frontend'
            }
        }

    }
}