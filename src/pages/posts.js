import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

const PostLink = ({ post }) => (
    <h3>
        <Link to={post.frontmatter.path}>
            {post.frontmatter.title} ({post.frontmatter.date})
        </Link>
    </h3>
)

const IndexPage = ({
    data: {
        allMarkdownRemark: { edges }
    }
}) => {
    const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => (
            <li key={edge.node.id}>
                <PostLink post={edge.node} />
                <div className="post-excerpt">{edge.node.excerpt}</div>
            </li>
        ))

    return (
        <Layout>
            <ul className="post-list" style={styles}>
                {Posts}
            </ul>
        </Layout>
    )
}

export default IndexPage

const styles = {
    listStyleType: 'none',
    maxWidth: 630,
    margin: '0 auto'
}

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        path
                        title
                    }
                }
            }
        }
    }
`
