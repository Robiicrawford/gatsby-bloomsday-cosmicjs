import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(
      this,
      'props.data.cosmicjsSettings.metadata.site_title'
    )
    const results = get(this, 'props.data.allCosmicjsResults.edges')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <Helmet title={siteTitle} />
        <div style={{display:'inline'}}>
          {results.map(({ node }) => {
            const title = get(node, 'title') || node.slug
            return (
              <div key={node.slug} style={{width:'30%', display:'inline-block',}}>
                <Link style={{ boxShadow: 'none' }} to={`results/${node.slug}`}>
                  <div style={{ margin:'0.3rem', padding:'1rem', border:'1px solid black', borderRadius:'5px', cursor:'pointer'}}>
                    <h3
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      {title} 
                    </h3>
                    <small style={{color:'black'}}>{node.created}</small>
                    <p 
                      style={{color:'black'}}
                      dangerouslySetInnerHTML={{ __html: node.metadata.description }}
                    />
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    allCosmicjsResults(sort: { fields: [created], order: DESC }, limit: 1000) {
      edges {
        node {
          metadata {
            description
          }
          slug
          title
          created(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
`
