import { ErrorContainer, ErrorContent } from './styles';

const CustomError = ({ message }) => (
	<ErrorContainer>
		<ErrorContent>{message}</ErrorContent>
	</ErrorContainer>
);

export default CustomError;
