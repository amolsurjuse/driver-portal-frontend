package _Self.buildTypes

import _Self.vcsRoots.HttpsGithubComAmolsurjuseDriverPortalFrontendRefsHeadsMain
import jetbrains.buildServer.configs.kotlin.BuildType
import jetbrains.buildServer.configs.kotlin.buildFeatures.perfmon
import jetbrains.buildServer.configs.kotlin.buildSteps.script
import jetbrains.buildServer.configs.kotlin.triggers.vcs

object Build : BuildType({
    name = "Deploy Driver Portal Frontend (dev)"
    description = "Build, push image, update k8s Helm tag, and trigger ArgoCD deployment."

    vcs {
        root(HttpsGithubComAmolsurjuseDriverPortalFrontendRefsHeadsMain)
        cleanCheckout = true
    }

    params {
        param("env.IMAGE_REPO", "amolsurjuse/driver-portal-frontend")
        param("env.K8S_REPO_URL", "")
        param("env.K8S_BRANCH", "develop")
        param("env.K8S_VERSION_FILE", "charts/config/services/driver-portal-ui/us/version/dev-version.yaml")
        param("env.K8S_COMMIT_NAME", "TeamCity CI")
        param("env.K8S_COMMIT_EMAIL", "teamcity@electrahub.com")
        param("env.ARGO_APP_NAME", "driver-portal-ui")
        param("env.ARGOCD_INSECURE", "true")

        // Configure these in TeamCity UI (password type for secret values).
        param("env.DOCKER_USERNAME", "")
        param("env.DOCKER_PASSWORD", "")
        param("env.GITHUB_USER", "")
        param("env.GITHUB_TOKEN", "")
        param("env.ARGOCD_SERVER", "")
        param("env.ARGOCD_USERNAME", "")
        param("env.ARGOCD_PASSWORD", "")
    }

    steps {
        script {
            name = "Build and Deploy Driver Portal"
            scriptContent = """
                set -eu
                chmod +x ci/teamcity/deploy_driver_portal.sh
                bash ./ci/teamcity/deploy_driver_portal.sh
            """.trimIndent()
        }
    }

    triggers {
        vcs {
            branchFilter = """
                +:refs/heads/main
            """.trimIndent()
        }
    }

    features {
        perfmon {}
    }

    requirements {
        exists("docker.server.version")
    }
})
