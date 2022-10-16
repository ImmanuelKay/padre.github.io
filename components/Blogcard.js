import Link from "next/link"
import styles from "../styles/BlogCard.module.css";

export default function BlogPost({title, coverPhoto,slug}){
    return(
        <div className={styles.card}>
            <Link href={'/posts/'+ slug}>
                <div className= {styles.imgContainer}>
                    <img src={coverPhoto.url} alt="" />
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
            </div>
        </div>
    );
}


