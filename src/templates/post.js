import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Parser from 'html-react-parser'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import './post.css'

export default function Template({ data, location }) {
    console.log('post.js', location)

    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html, id, excerpt } = markdownRemark

    const { origin } = location
    const imageSrc = frontmatter.image.childImageSharp.sizes.src

    return (
        <Fragment>
            <Helmet>
                {/* General tags */}
                <title>Joshua Iz - {frontmatter.title}</title>
                <meta name="description" content={excerpt} />
                <meta name="image" content={origin + imageSrc} />

                {/* OpenGraph tags */}
                <meta
                    property="og:url"
                    content={`${location.origin}${location.pathname}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={frontmatter.title} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:image" content={origin + imageSrc} />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="joshuaiz" />
                <meta name="twitter:title" content={frontmatter.title} />
                <meta name="twitter:description" content={excerpt} />
                <meta name="twitter:image" content={origin + imageSrc} />
            </Helmet>
            <Layout>
                <div className={`blog-post-container ${id}`}>
                    <div className="blog-post">
                        <h1>{frontmatter.title}</h1>
                        <h2>{frontmatter.date}</h2>
                        {frontmatter.image && (
                            <div className="post-image">
                                <Img
                                    sizes={
                                        frontmatter.image.childImageSharp.sizes
                                    }
                                />
                            </div>
                        )}
                        <div className="blog-post-content">{Parser(html)}</div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            id
            html
            excerpt(pruneLength: 100)
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
                image {
                    childImageSharp {
                        sizes(maxWidth: 1200) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`
