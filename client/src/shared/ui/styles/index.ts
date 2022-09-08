import styled from 'styled-components';
/* import { variables } from '../../../app/styles/themes'; */
import { LoadingOutlined } from '@ant-design/icons';

export const StyledContainer = styled.div`
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 1140px;
`;

export const StyledLoadingIndicator = styled(LoadingOutlined)`
  font-size: 4rem;
  display: block;
  margin: auto;
`;

export const StyledMain = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 1.875rem;
`;

export const StyledFormAuthWrapper = styled('div')((props) => ({
  padding: '25px 30px',
  maxWidth: '320px',
  margin: 'auto',
  display: 'grid',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
}));
