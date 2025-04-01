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
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    bat 'npm test'
                }
            }
        }
        stage('3. Publish Reports') {
            steps {
                bat 'dir playwright-report'
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                bat 'dir cucumber-report'
                archiveArtifacts artifacts: 'cucumber-report/**', allowEmptyArchive: true
                bat 'echo publish playwright-report HTML'
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
                bat 'echo publish-cucumber-report'
                 publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cucumber-report',
                    reportFiles: 'index.html',
                    reportName: 'Cucumber HTML Report'
                ])
                bat 'echo ALLURE REPORT - Build report'
                bat 'allure serve allure-results'
                bat 'echo Generate report'
                bat 'allure generate allure-results --clean -o allure-report'
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
                bat 'echo Publish allure-report'
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure HTML Report'
                ])
            }
        }
    }

//     post {
//         always {
//             Always record test results (if JUnit report is generated, uncomment below)
//             junit 'results.xml'
//         }
//         We could also add cleanup steps here if needed (e.g., npm cache clean or remove node modules)
//     }
}