import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Title from '../styles/Title';
import CommunityList from '../components/CommunityList';
import Pagination from '../components/Pagination';
import { URL_WRITEPOST } from '../routesURL';
import { getPostList } from '../api/communityAPI';
import Modal from '../components/Modal';
import { Button } from '../styles/Buttons';

function Community() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(19);
	const location = useLocation();
	const [data, setData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (location.search) {
			getPostList(location.search).then((res) => {
				setData(res.data);
				setTotalPage(res.headers.get('X-Total-Pages'));
			});
		}
	}, [searchParams]);

	const handleConfirm = () => {
		setIsModalOpen(false);
	};
	return (
		<CommunityPageContainer>
			<Title className="cummunityTitle">Community</Title>
			<div className="flex">
				<CommunityList data={data} />
				{isAuthenticated && (
					<Link to={URL_WRITEPOST} className="postWrite">
						글 작성
					</Link>
				)}
				{isAuthenticated || (
					<Button
						type="button"
						className="postWrite"
						onClick={() => setIsModalOpen(true)}
					>
						글 작성
					</Button>
				)}
				{totalPage >= 0 && (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalPage={totalPage}
						setSearchParams={setSearchParams}
					/>
				)}
				{isModalOpen && (
					<Modal
						message="회원만 작성 가능합니다."
						cancel={false}
						handleConfirm={handleConfirm}
					/>
				)}
			</div>
		</CommunityPageContainer>
	);
}

const CommunityPageContainer = styled.section`
	position: relative;
	top: 80px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 50px 0px 30px 0px;
	width: 100vw;
	max-height: 1000px;
	background-image: url('https://www.tfmedia.co.kr/data/photos/20200728/art_15942253142942_524c96.png');
	background-repeat: no-repeat;
	background-size: cover;
	.flex {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		max-width: 1200px;
		border-radius: 5px;
	}
	.postWrite {
		height: 30px;
		width: 100px;
		padding: 3px;
		margin: 20px 30px 20px auto;
		background-color: var(--main-color);
		color: var(--text-white-color);
		box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.25),
			inset 0px 2px 0px rgba(255, 255, 255, 0.25);
		border-radius: 5px;
		font-size: var(--base);
		font-weight: 700;
		align-items: center;
		display: flex;
		justify-content: center;
	}
	.postWrite:hover {
		background-color: var(--sub3-color);
		color: var(--text-black-color);
		box-shadow: 0px 2px 0px rgba(255, 255, 255, 0.25),
			inset 0px 2px 0px rgba(0, 0, 0, 0.25);
	}
	.cummunityTitle {
		width: 100%;
		text-align: center;
		font-size: 70px;
		color: white;
		text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.25);
		margin-bottom: 80px;
	}
	@media (max-width: 768px) {
		top: 70px;
		padding: 10px;
		.postWrite {
			width: 80px;
			height: 30px;
			font-size: var(--base);
		}
		.cummunityTitle {
			margin-top: 30px;
			margin-bottom: 0px;
			font-size: 50px;
		}
		.title {
			margin-right: auto;
		}
	}
`;

export default Community;
