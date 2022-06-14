import "../styles/globals.css";
import Head from "next/head";
import { MoralisProvider } from "react-moralis";
import Header from "../components/Header";
import { NotificationProvider } from "web3uikit";

function MyApp({ Component, pageProps }) {
	return (
		<div className="bg-gradient-to-t from-indigo-400 to-pink-100 min-h-screen">
			<Head>
				<title>Broad Ocean</title>
				<meta name="description" content="NFT Exchange" />
				<link rel="icon" href="/skull.png" />
			</Head>

			<MoralisProvider
				appId={process.env.NEXT_PUBLIC_APP_ID}
				serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
			>
				<NotificationProvider>
					<Header />
					<Component {...pageProps} />
				</NotificationProvider>
			</MoralisProvider>
		</div>
	);
}

export default MyApp;
