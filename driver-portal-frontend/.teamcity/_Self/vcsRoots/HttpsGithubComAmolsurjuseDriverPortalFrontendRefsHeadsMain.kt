package _Self.vcsRoots

import jetbrains.buildServer.configs.kotlin.vcs.GitVcsRoot

object HttpsGithubComAmolsurjuseDriverPortalFrontendRefsHeadsMain : GitVcsRoot({
    name = "https://github.com/amolsurjuse/driver-portal-frontend#refs/heads/main"
    url = "https://github.com/amolsurjuse/driver-portal-frontend"
    branch = "refs/heads/main"
    branchSpec = """
        +:refs/heads/*
    """.trimIndent()
})
