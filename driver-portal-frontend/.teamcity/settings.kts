import jetbrains.buildServer.configs.kotlin.BuildType
import jetbrains.buildServer.configs.kotlin.DslContext
import jetbrains.buildServer.configs.kotlin.buildSteps.script
import jetbrains.buildServer.configs.kotlin.project
import jetbrains.buildServer.configs.kotlin.triggers.vcs

version = "2025.11"

project {
  buildType(DeployDriverPortalFrontend)
}

object DeployDriverPortalFrontend : BuildType({
  id("Deploy_DriverPortalFrontend_Dev")
  name = "Deploy Driver Portal Frontend (dev)"
  description = "Builds/pushes frontend image and updates k8s-platform dev tag for ArgoCD deployment."

  vcs {
    root(DslContext.settingsRoot)
    cleanCheckout = true
  }

  params {
    param("env.IMAGE_REPO", "amolsurjuse/driver-portal-frontend")
    param("env.K8S_REPO_URL", "git@github.com:amolsurjuse/k8s-platform.git")
    param("env.K8S_BRANCH", "develop")
    param("env.K8S_VERSION_FILE", "charts/config/services/driver-portal-ui/us/version/dev-version.yaml")
    param("env.K8S_COMMIT_NAME", "TeamCity CI")
    param("env.K8S_COMMIT_EMAIL", "teamcity@electrahub.com")
    param("env.ARGO_APP_NAME", "driver-portal-ui")
    param("env.ARGOCD_INSECURE", "true")

    // Override these as secure/password parameters in TeamCity UI.
    param("env.DOCKER_USERNAME", "")
    param("env.DOCKER_PASSWORD", "")
    param("env.ARGOCD_SERVER", "")
    param("env.ARGOCD_USERNAME", "")
    param("env.ARGOCD_PASSWORD", "")
  }

  steps {
    script {
      name = "Build and Deploy Driver Portal"
      workingDir = "."
      scriptContent = """
                set -euo pipefail
                chmod +x driver-portal-frontend/ci/teamcity/deploy_driver_portal.sh || chmod +x ci/teamcity/deploy_driver_portal.sh
                if [ -x driver-portal-frontend/ci/teamcity/deploy_driver_portal.sh ]; then
                  driver-portal-frontend/ci/teamcity/deploy_driver_portal.sh
                else
                  ci/teamcity/deploy_driver_portal.sh
                fi
            """.trimIndent()
    }
  }

  triggers {
    vcs {
      branchFilter = """
                +:refs/heads/main
            """.trimIndent()
      triggerRules = """
                +:driver-portal-frontend/**
            """.trimIndent()
    }
  }

  requirements {
    exists("docker.server.version")
  }
})
