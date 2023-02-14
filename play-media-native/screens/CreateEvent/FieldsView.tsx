import { inputContainerStyle } from './styles';
import { InputText } from '../../components/InputText/InputText';

export const FieldsView = () => {
  return (
    <>
      <InputText containerStyle={inputContainerStyle} label="Title" multiline />
      <InputText containerStyle={inputContainerStyle} label="Time and Date" multiline />
      <InputText containerStyle={inputContainerStyle} label="Location" multiline />
    </>
  );
};
