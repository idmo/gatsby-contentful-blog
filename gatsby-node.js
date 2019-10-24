const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    // data from Contentful
    return graphql(
        `
        {
            allContentfulBlogPost {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
        `
    ).then(result => {
        if(result.errors) {
            console.log("Something shit the bed", result.errors)
        }

        // resolve the paths.
        const blogPostTemplate = path.resolve("./src/templates/blogpost.js")

        result.data.allContentfulBlogPost.edges.forEach(edge => {
            createPage ({
                path: `/blogpost/${edge.node.slug}/`,
                component: slash(blogPostTemplate),
                context: {
                    slug: edge.node.slug,
                    id: edge.node.id
                }
            })
        })
    })
}