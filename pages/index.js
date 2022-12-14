import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GraphQLClient,gql} from 'graphql-request';
import BlogCard from '../components/Blogcard';

const graphcms = new GraphQLClient('https://api-us-west-2.hygraph.com/v2/cl95r8dmd6dnf01ukeleo4izk/master');

const QUERY = gql`
{
  posts {
    id
    title
    datePublished
    slug
    content {
      html
    }
    author {
      name
      avatar {
        url
      }
    }
    coverPhoto {
      publishedAt
      createdBy {
        id
      }
      url
    }
  }
}
`;
export async function getStaticProps(){
  const {posts} = await graphcms.request(QUERY);
  return{
    props: {
      posts,
    },
    revalidate: 10,
  };
}
export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Padre</title>
        <meta name="description" content="A blog Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='topbox'>
          <nav> <h1>Padre</h1></nav>
      </div>
     
      <main className={styles.main}>  
       {posts.map((post) => (
       <BlogCard 
          title={post.title} 
          author={post.author}
          coverPhoto = {post.coverPhoto} 
          key = {post.id}
          datePublished={post.datePublished}
          slug = {post.slug}
           />))}
      </main>
    </div>
  )
}
