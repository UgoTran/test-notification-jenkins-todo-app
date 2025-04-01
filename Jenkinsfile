pipeline {
    agent any

    tools {
        nodejs "NodeJS 22"
    }

    stages {
        stage('1. Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npm install'
            }
        }
        stage('2. Run Playwright Tests') {
            steps {
                // Run tests in headless mode (default).
                // The --reporter option here outputs both line summary and HTML results.
                sh 'npx playwright test --reporter=dot,html'
            }
        }
        stage('3. Publish Reports') {
            steps {
                // Archive the Playwright HTML report so we can view it later
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                // Optionally, publish HTML report to Jenkins (if HTML Publisher plugin is installed)
                // publishHTML([allowMissing: true, alwaysLinkToLastBuild: true,
                //    keepAll: true, reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report'])
            }
        }
    }

    post {
        always {
            // Always record test results (if JUnit report is generated, uncomment below)
            // junit 'results.xml'
        }
        // We could also add cleanup steps here if needed (e.g., npm cache clean or remove node modules)
    }
}