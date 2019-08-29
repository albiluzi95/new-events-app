node {
  try {
     stage ('Setup NodeJs'){
        env.NODE_HOME="${tool 'nodejs10.x'}"
        env.PATH="${env.NODE_HOME}/bin:${env.PATH}"
        sh 'npm -version'
    }
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build Docker test'){
     sh 'docker build -t events-app-test -f Dockerfile.test --no-cache .'
    }
    stage('Docker test'){
      sh 'docker run --rm events-app-test'
    }
    stage('Clean Docker test'){
      sh 'docker rmi events-app-test'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t events-app --no-cache .'
        sh 'docker tag events-app localhost:5000/events-app'
        sh 'docker push localhost:5000/events-app'
        sh 'docker rmi -f events-app localhost:5000/events-app'
      }
    }
  }
  catch (err) {
    throw err
  }
}