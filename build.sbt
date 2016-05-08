name := """CymIT"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  "org.webjars" % "angularjs" % "1.3.8",
  "org.webjars" % "font-awesome" % "4.3.0",
  "org.webjars" % "bootstrap" % "3.3.1",
  "org.webjars" % "jquery" % "2.1.3",
  "org.webjars.bower" % "parallax" % "2.1.3",
  specs2 % Test
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"


pipelineStages := Seq(uglify, digest, gzip)
// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

val buildSettings = Defaults.defaultSettings ++ Seq(
   javaOptions += "-Xms25M",
   javaOptions += "-Xmx25M",
   javaOptions += "-Xss1M",
   javaOptions += "-XX:MaxPermSize=25M"
)
