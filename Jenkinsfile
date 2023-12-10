pipeline{
    environment{
        DOCKERHUB_REGISTRY = "aamadeuss/foodmenu"
        DOCKERHUB_CREDENTIALS = credentials("docker")
    }
    agent any
    
    stages{
        stage("Git Build"){
            steps{
                git branch: "main",
                url: "https://github.com/aamadeuss/spe-final.git"
            }
        }
        stage("Running frontend React tests"){
            steps{
                sh '''
                    cd src
                    cd components
                    npm --force ci
                    timeout 10s npm test
                '''
            }
        }
        stage("Running backend super tests"){
            steps{
                sh '''
                    cd backend
                    npm ci
                    npx jest --forceExit
                '''
            }
        }
        stage("Build Backend Docker Image"){
            steps{
                sh "docker build -t $DOCKERHUB_REGISTRY-backend:latest backend/"
            }
        }
        stage("Build Frontend Docker Image"){
            steps{
                sh "docker build -t $DOCKERHUB_REGISTRY-frontend:latest ."
            }
        }
        stage("Log in to Dockerhub"){
            steps{
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
            }
        }
        stage("Push Backend Docker image to Dockerhub"){
            steps{
                sh "docker push $DOCKERHUB_REGISTRY-backend:latest"
            }
        }
        stage("Push Frontend Docker image to Dockerhub"){
            steps{
                sh "docker push $DOCKERHUB_REGISTRY-frontend:latest"
            }
        }
        stage("Ansible deployment"){
            steps{
                ansiblePlaybook becomeUser: null,
                colorized: true,
                disableHostKeyChecking: true,
                installation: 'Ansible',
                inventory: 'inventory',
                playbook: 'ansible-playbook.yml',
                sudoUser: null
            }
        }
    }
}

