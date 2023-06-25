import Link from 'next/link';
import React from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import { PostType } from '@/types';
import connect from '@/utils/db';
import Post from '@/models/Post';


async function getData(){
    await connect()

    const posts = await Post.find()

    return posts;
}

const Blog = async () => {
    const data = await getData();
    return (
      <div className={styles.mainContainer}>
        {data.map((item: PostType) => (
          <Link href={`/blog/${item._id}`} className={styles.container} key={item._id}>
            <div className={styles.imageContainer}>
              <Image
                src={item.img}
                alt=""
                width={400}
                height={250}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

export default Blog