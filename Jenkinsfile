pipeline {
    agent any

    tools {
        nodejs "NodeJS 22"
    }

    stages {
        stage('* Check branch') {
            steps {
                bat 'git branch'
            }
        }

        stage('1. Install Dependencies') {
            steps {
                bat 'node -v'
                bat 'npm install'
            }
        }
        stage('2. Run Playwright Tests') {
            steps {
                // Run tests in headless mode (default).
                // The --reporter option here outputs both line summary and HTML results.
//                 sh 'npx playwright test --reporter=dot,html'
                try {
                    bat 'npm test'
                } catch (e) {
                    currentBuild.result = 'UNSTABLE'
                }
            }
        }
        stage('3. Publish Reports') {
            steps {
                echo 'Publishing reports...'
                // Archive the Playwright HTML report so we can view it later
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                // Optionally, publish HTML report to Jenkins (if HTML Publisher plugin is installed)
                // publishHTML([allowMissing: true, alwaysLinkToLastBuild: true,
                //    keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
            }
        }
    }

//     post {
//         always {
//             junit 'results.xml'
//         }
//     }
}