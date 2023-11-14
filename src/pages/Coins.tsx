import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
	// 0px for vertical, 20px for horizontal
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.textColor};
	margin-bottom: 10px;
	border-radius: 15px;
	a {
		padding: 20px;
		transition: color 0.2s ease-in;
		// coin card의 끝부분까지도 클릭할 수 있게 해줌
		display: flex;
		align-items: center;
		/* justify-content: center; */
	}
	&:hover {
		// Link도 결국에는 anchor가 됨. 그치만 react-router-dom이 핸들링하기 위한 특별한 이벤트 리스너가 있음
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const setDarkAtom = useSetRecoilState(isDarkAtom);
	const toggleDarkAtom = () => setDarkAtom((value) => !value);
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	// const [coins, setCoins] = useState<ICoin[]>([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	(async () => {
	// 		const response = await fetch("https://api.coinpaprika.com/v1/coins");
	// 		const json = await response.json();
	// 		setCoins(json.slice(0, 100));
	// 		setLoading(false);
	// 	})();
	// }, []);

	return (
		// 5.4 강의 8분56초에서 멈춤...
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
				<button onClick={toggleDarkAtom}>Toggle Mode</button>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name },
								}}
							>
								<Img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
