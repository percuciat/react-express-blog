import styled from 'styled-components';
import { variables } from './themes';
import { LoadingOutlined } from '@ant-design/icons';

export const ContainerS = styled.div`
  max-width: ${variables.sizes.container}px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`;

export const SectionS = styled.section`
  padding: 2rem 0;
`;

export const LoadingIndicatorS = styled(LoadingOutlined)`
  font-size: 4rem;
  display: block;
  margin: auto
`