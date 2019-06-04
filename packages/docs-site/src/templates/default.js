import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'

import '@royalnavy/css-framework/index.scss'

import withNavigation from '../components/enhancers/withNavigation'
import Footer from '../components/presenters/footer'
import Layout from '../components/presenters/layout'
import PostArticle from '../components/presenters/post-article'
import Sidebar from '../components/presenters/sidebar'
import CodeHighlighter from '../components/presenters/code-highlighter'

const SidebarWithNavigation = withNavigation(Sidebar)

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
  }
`

export default function Template({ data }) {
  const { markdownRemark: post } = data

  return (
    <Layout className="">
      <Helmet title={`${post.frontmatter.title} | NELSON Standards`} />
      <PostArticle postData={post} />
      <CodeHighlighter
        language="javascript"
        example={<h1>This is some example JSX</h1>}
        source="function restructureNodes(nodes) { return nodes.map(node => {}) }"
      />
      <SidebarWithNavigation title="Example sidebar" />
      <Footer />
    </Layout>
  )
}

Template.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
}
