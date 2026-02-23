package _Self

import _Self.buildTypes.Build
import _Self.vcsRoots.HttpsGithubComAmolsurjuseDriverPortalFrontendRefsHeadsMain
import jetbrains.buildServer.configs.kotlin.Project

object Project : Project({
    buildType(Build)
    vcsRoot(HttpsGithubComAmolsurjuseDriverPortalFrontendRefsHeadsMain)
})
