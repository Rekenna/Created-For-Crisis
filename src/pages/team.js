import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Banner from "../components/blocks/banner"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContentContainer, Grid } from "../styles/components"
import TeamMember from "../components/teamMember"

const Team = () => {
  const {
    allContentfulTeamMember: { edges: teamMembers },
    contentfulBanner,
  } = useStaticQuery(graphql`
    query getTeamData {
      contentfulBanner(id: { eq: "d62d5f94-075e-5609-aa0b-c3ddcd86b5f9" }) {
        title
        illustration {
          file {
            url
          }
        }
        actions {
          text
          variant
          link
          icon
        }
        content {
          json
        }
      }
      allContentfulTeamMember {
        edges {
          node {
            id
            name
            position
            role
            biography {
              internal {
                content
              }
            }
            linkedInUrl
            gitHubUrl
            image {
              description
              fluid(
                quality: 100
                maxHeight: 120
                maxWidth: 120
                cropFocus: FACE
                resizingBehavior: FILL
              ) {
                src
              }
            }
          }
        }
      }
    }
  `)

  /*
   ** Breakdown team members by role
   */

  let founder = teamMembers.filter(
    ({ node: { position } }) => position === "Founder"
  )[0]

  let orgLeaders = teamMembers.filter(
    ({ node: { position } }) => position === "Organization Leader"
  )

  let projectLeads = teamMembers.filter(
    ({ node: { position } }) => position === "Project Lead"
  )

  let contributors = teamMembers.filter(
    ({ node: { position } }) => position === "Contributor"
  )

  return (
    <Layout>
      <SEO title="Team" />
      <Banner {...contentfulBanner} />
      <ContentContainer>
        {founder && (
          <section>
            <h2
              style={{
                margin: "4rem 0 2rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Founder
            </h2>
            <TeamMember {...founder.node} fullSize />
          </section>
        )}
        {orgLeaders.length > 0 && (
          <section>
            <h2
              style={{
                margin: "4rem 0 2rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Organization Leaders
            </h2>
            {/* <Grid sm={1} md={1} lg={2}> */}
            {orgLeaders.map(({ node }) => (
              <TeamMember key={node.id} {...node} fullSize />
            ))}
            {/* </Grid> */}
          </section>
        )}
        {projectLeads.length > 0 && (
          <section>
            <h2
              style={{
                margin: "4rem 0 2rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Project Leads
            </h2>
            {projectLeads.map(({ node }) => (
              <TeamMember key={node.id} {...node} fullSize />
            ))}
          </section>
        )}
        {contributors.length > 0 && (
          <section>
            <h2
              style={{
                margin: "4rem 0 2rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Contributors
            </h2>
            <Grid>
              {contributors.map(({ node }) => (
                <TeamMember key={node.id} {...node} />
              ))}
            </Grid>
          </section>
        )}
      </ContentContainer>
    </Layout>
  )
}

export default Team
