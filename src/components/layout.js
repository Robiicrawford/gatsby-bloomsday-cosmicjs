import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import { getImage, StaticImage, GatsbyImage } from "gatsby-plugin-image"

import sportstats from '../../static/icon_square.jpeg'
import { rhythm, scale } from '../utils/typography'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import "./layout.css"


export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
            site_heading
            homepage_hero {
              local {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            partner_image {
              local {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    width: 500
                  )
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const siteTitle = data.cosmicjsSettings.metadata.site_heading
      const homgePageHero = data.cosmicjsSettings.metadata.homepage_hero.local.childImageSharp.fluid
      let header

      const image = getImage(data.cosmicjsSettings.metadata.partner_image.local)

      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }

      if (location.pathname === rootPath || location.pathname === postsPath) {
        header = (
          <BackgroundImage
            Tag="div"
            className="post-hero"
            fluid={homgePageHero}
            backgroundColor={`#007ACC`}
            style={{
          //    filter: 'grayscale(75%)',
              height: rhythm(11),
              position: 'relative',
              marginBottom: `${rhythm(1.5)}`,
              borderBottom:'5px solid #003E1A'
            }}
          >
            <h1
              style={{
                ...scale(1.3),
                position: 'absolute',
                textAlign: 'center',
                left: 0,
                right: 0,
                top: rhythm(4),
                marginTop: '0',
                height: rhythm(2.7),
              }}
            >
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'inline-flex',
                  width:'100%'
                }}
                to={'/'}
              >
                <div 
                  style={{width:'46%', display:'flex', justifyContent:'end'}}
                >
                  <StaticImage 
                    placeholder="blurred" 
                    src={'../../static/sportstats partner portal simple-01.png'} 
                    alt={"sportstats"}
                    layout="fixed"
                    height={100}
                    width={550}
                  />
                </div>
                <span style={{fontSize:'6.2rem',fontWeight:'bolder', width:'8%', color:'black'}}>  // </span>
                <div style={{ width:'46%', display:'flex', justifyContent:'start'}} >
                  <GatsbyImage image={image} alt={'partner name'}  style={{marginLeft:'1.5rem'}}/>
                </div>
               
              </Link>
            </h1>
            <div 
              style={{
                position:'absolute', bottom:'0', marginLeft:'auto', marginRight:'auto', 
                backgroundColor:'#003E1A', padding:'0.2rem 1rem', borderRadius:'5px 5px 0 0',
                left: 0, right: 0, width: '270px', textAlign: 'center', color:'white', fontSize:'1.5rem', marginTop:'1rem'
              }}
            > 
              PARTNER PORTAL
            </div>
          </BackgroundImage>
        )
      } else {
        header = (
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              marginTop: 0,
              marginBottom: rhythm(-1),
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(24),
              paddingTop: `${rhythm(1.5)}`,
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
              to={'/'}
            >
              {siteTitle}
            </Link>
          </h3>
        )
      }
      return (
        <div style={{fontFamily: 'industry !important'}}>
          {header}
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(45),
              padding: `0 ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)}`,
              minHeight: 'calc(100vh - 42px)',
            }}
          >
            {children}
          </div>
          <footer
            style={{
              textAlign: 'center',
              padding: `0 20px 80px 0`,
            }}
          >
            powered by&nbsp;
            <a
              target="_blank"
              href="https://sportstats.ca"
              style={{
                color: '#191919',
                boxShadow: 'none',
              }}
            >
              <img
                src={sportstats}
                alt="Gatsby JS"
                style={{
                  width: '20px',
                  margin: '0 4px -3px 2px',
                }}
              />
              <strong>Sportstats</strong>
            </a>

          </footer>
        </div>
      )
    }}
  />
)
