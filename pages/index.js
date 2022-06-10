import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Broad Ocean</title>
				<meta name="description" content="NFT Exchange" />
				<link rel="icon" href="/skull.png" />
			</Head>
			Home Page
		</div>
	);
}
