import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import useInput from '../hooks/useInput';
import MyProfile from './MyProfile';
import { postCommunity } from '../api/communityAPI';

function CommunityComment({ setIsCModalOpen }) {
	// 초기 값 props로 받으면 useInput에 넣기
	const [textareaBind] = useInput('555');
	const [isEdit, setIsEdit] = useState(false);
	const textareaRef = useRef(null);

	// 수정 시 ContentInput에 포커스
	const handleFocus = () => {
		if (textareaRef.current) {
			textareaRef.current.focus();
			textareaRef.current.setSelectionRange(
				textareaBind.value.length,
				textareaBind.value.length,
			);
		}
	};

	useEffect(() => {
		if (isEdit) {
			handleFocus();
		}
	}, [isEdit]);

	// 댓글 수정 함수 작성해야함
	function editComment() {
		postCommunity(
			`/comments/id`,
			{
				p_id: '게시글아이디',
				c_id: '댓글 아이디',
				c_content: textareaBind.value,
				m_id: '작성자아이디',
			},
			'patch',
		);
		setIsEdit(false);
	}
	return (
		<>
			<MyProfile className="porfile" />
			{isEdit ? (
				<ContentTextarea {...textareaBind} ref={textareaRef} autofocus />
			) : (
				<Content>{textareaBind.value}</Content>
			)}
			<CommentDitail>
				<time dateTime="2023-05-09">2023.05.9</time>
				<ButtonWrapper>
					{isEdit ? (
						<button onClick={() => editComment()} type="button">
							수정 완료
						</button>
					) : (
						<button onClick={() => setIsEdit(true)} type="button">
							수정
						</button>
					)}
					<button type="button" onClick={() => setIsCModalOpen(true)}>
						삭제
					</button>
				</ButtonWrapper>
			</CommentDitail>
			<Line />
		</>
	);
}

const Content = styled.p`
	font-size: var(--base);
	padding: 15px 0px;
	line-height: 1.5;
	text-align: justify;
	word-break: break-all;
`;

const ContentTextarea = styled.textarea`
	font-size: var(--base);
	padding: 10px 0px;
	line-height: 1.5;
	text-align: justify;
	word-break: break-all;
	margin: 15px 0px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: right;
	color: var(--main-color);
	font-size: var(--small);

	button {
		cursor: pointer;
		margin-left: 15px;
		border: 0;
		outline: 0;
		background-color: #fffffff0;
		font-size: var(--small);
		color: var(--main-color);
	}
`;

const Line = styled.div`
	height: 1px;
	background-color: var(--line-color);
	margin: 15px 0px;
`;

const CommentDitail = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: var(--small);
	color: var(--line-color);
`;

export default CommunityComment;
