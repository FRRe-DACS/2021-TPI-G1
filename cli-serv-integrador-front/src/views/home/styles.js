import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 25px;
`;

export const HomeContent = styled.div`
	min-width: 50%;
	padding: 10px;
	border: 1px solid black;
	border-radius: 4px;
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
	color: #1f2937;

	> div,
	a {
		padding: 4px;
	}

	.ok {
		color: #059669;
	}

	.no-ok {
		color: #6b7280;
	}

	.details {
		font-size: 0.9em;
	}
`;

export const GridHeader = styled.header`
	color: white;
	display: grid;
	grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
	gap: 2px;

	div {
		background-color: #0d4f8f;
		padding: 10px 5px;
	}
`;

export const Filter = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 15px;
	align-items: flex-end;
`;

export const FilterElement = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	margin-right: 15px;
`;

export const FilterLabel = styled.label`
	font-size: 14px;
	font-weight: 400;
`;

export const FilterInput = styled.input`
	margin-top: 5px;
`;

export const FilterButton = styled.button`
	border: none;
	background-color: #0d4f8f;
	color: white;
	border-radius: 4px;
	padding: 10px;
	cursor: pointer;
`;

export const ClearButton = styled(FilterButton)`
	background-color: #9ca3af;
	margin-bottom: 15px;
`;
