import { getDocuments } from 'content-structure'

async function checkUrls() {
    const documents = await getDocuments({ format: "markdown" })
    const blogIndex = documents.find(d => d.path.includes('blog.md'))
    const storiesIndex = documents.find(d => d.path.includes('stories.md'))

    console.log('Blog Index:', blogIndex ? { path: blogIndex.path, url: blogIndex.url, slug: blogIndex.slug } : 'Not Found')
    console.log('Stories Index:', storiesIndex ? { path: storiesIndex.path, url: storiesIndex.url, slug: storiesIndex.slug } : 'Not Found')
}

checkUrls()
