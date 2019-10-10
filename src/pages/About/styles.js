import styled from 'styled-components/native';

export const Card = styled.View`
  margin: 5px;
  padding: 10px;
  background: #fff;
  /* box-shadow: 0px 1px 4px #000; */
  elevation: 2;
  border-radius: 2px;
`;

export const Paragraph = styled.Text`
  text-align: justify;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

export const Separator = styled.View`
  width: 50%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
`;

export const Contact = styled.View`
  flex-direction: row;
`;
