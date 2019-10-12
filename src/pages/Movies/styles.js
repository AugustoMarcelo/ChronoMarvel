import styled from 'styled-components/native';

export const Shadow = styled.View`
  margin: 0 10px 5px;
  border-radius: 4px;
  background: #fff;
  elevation: 4;
`;

export const Separator = styled.View`
  width: 50%;
  align-self: center;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

export const Card = styled.View`
  margin: 0 10px 10px;
  padding: 10px;
  background: #fff;
  elevation: 2;
  border-radius: 2px;
`;

export const CardTop = styled.View`
  flex-direction: row;
`;

export const MoreInfo = styled.View`
  margin-left: 10px;
`;

export const Button = styled.TouchableOpacity`
  elevation: 1;
  background: ${props => (props.disabled ? '#bbb' : '#00b894')};
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 2px;
`;
