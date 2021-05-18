// import Link from "next/link";
// import React from "react";
// import Head from "next/head";
// import Image from "next/image";
// import Layout from "../../components/Layout";

// export default function FirstPost() {
//   return (
//     <Layout>
//       {/* <Head>
//         <title>First Post</title>
//       </Head>
//       <h1>First Post</h1>
//       <Image src="/images/profile.jpg" height={144} width={144} alt="Harsh" />

//       <h2>
//         <Link href="/">
//           <a>Back to Home</a>
//         </Link>
//       </h2> */}
//     </Layout>
//   );
// }

import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

import Date from "../../components/Date.js";

import utilStyles from "../../styles/utils.module.css";

import Image from "next/image";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Image src={postData.coverImage} height={500} width={500} />

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// export default function Post({ postData }) {
//   return (
//     <Layout>
//       <Head>
//         <title>{postData.title}</title>
//       </Head>
//       {postData.title}
//       <br />
//       {postData.id}
//       <br />
//       <Date dateString={postData.date} />
//       <br />
//       <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
//     </Layout>
//   );
// }

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
