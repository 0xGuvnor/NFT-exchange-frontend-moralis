import "../styles/globals.css";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Broad Ocean</title>
				<meta name="description" content="NFT Exchange" />
				<link rel="icon" href="/skull.png" />
			</Head>

			<MoralisProvider initializeOnMount={false}>
				<Header />
				<Component {...pageProps} />
			</MoralisProvider>
		</div>
	);
}

export default MyApp;
