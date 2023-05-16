import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import CommunityEditor from '../components/CommunityEditor';
import { Button, WarningButton } from '../styles/Buttons';
import { postCommunity } from '../api/communityAPI';
import useInput from '../hooks/useInput';
import { URL_POST } from '../routesURL';

function CommunityEdit() {
	const navigate = useNavigate();
	const location = useLocation();
	const [titleBind] = useInput(location.state ? location.state.b_title : '');
	const [contentBind] = useInput(
		location.state ? location.state.b_content : '',
	);
	// 수정 시 기존의 제목, 내용, postid props로 받기

	// json서버 테스트용 실제서버는 url이랑 data 변경해야함
	function writePost() {
		if (titleBind.value === '') {
			alert('제목을 작성해주세요.');
		} else if (contentBind.value === '') {
			alert('내용을 작성해주세요.');
		} else if (location.state) {
			postCommunity(
				`/boards/${location.state.id}`,
				{
					b_title: titleBind.value,
					b_content: contentBind.value,
				},
				'patch',
			);
			navigate(`${URL_POST}/${location.state.id}`);
		} else {
			postCommunity('/boards', {
				b_title: titleBind.value,
				b_content: contentBind.value,
			});
			// 응답에서 postid 받으면 navigate연결하기
		}
	}
	return (
		<EditPage>
			<CommunityEditor contentBind={contentBind} titleBind={titleBind} />
			<div className="flex">
				<Button className="bt" onClick={() => navigate(-1)}>
					작성 취소
				</Button>
				<WarningButton className="bt" onClick={() => writePost()}>
					작성 완료
				</WarningButton>
			</div>
		</EditPage>
	);
}

const EditPage = styled.div`
	max-width: 1024px;
	width: 80vw;
	margin-left: auto;
	margin-right: auto;
	margin-top: var(--header-hight);
	padding: 50px 0px 100px 0px;

	.flex {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.bt {
		font-size: var(--base);
		height: 35px;
	}

	@media (max-width: 768px) {
		padding-top: 30px;
		.bt {
			width: 80px;
		}
	}
`;

export default CommunityEdit;
