import * as React from 'react';
import {useState} from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { Stack, IStackTokens } from '@fluentui/react';
import axios from 'axios';


const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'default question',
  closeButtonAriaLabel: 'Close',
  //subText: 'Do you want to send this message without a subject?',
};

const stackTokens: IStackTokens = { childrenGap: 40 };


export interface IButtonExampleProps {
    // These are set based on the toggles shown above the examples (not needed in real code)
    disabled?: boolean;
    checked?: boolean;
}
function _alertClicked(): void {
  axios.post(process.env.REACT_APP_API_ENDPOINT + '/chat/updateGamestate', 
  {
    GameState : "newGameState",
    turn: "",
  }).then(function (response) {
    localStorage.setItem("user", JSON.stringify(response.data));
}).catch(function (error) {
    console.log(error);
});
    alert('Clicked');
}

export const ButtonDefaultExample: React.FunctionComponent<IButtonExampleProps> = props => {
    const { disabled, checked } = props;

    return (
        <Stack tokens={stackTokens}>
            <DefaultButton style = {{marginTop:'2rem',  borderRadius: 0.5}}text="Dog walking a human" onClick={_alertClicked}  />
            <DefaultButton style = {{marginTop:'2rem',  borderRadius: 0.5}}text="Human walking a dog" onClick={_alertClicked}  />
            <DefaultButton style = {{marginTop:'2rem',  borderRadius: 0.5}}text="Dog walking a human" onClick={_alertClicked}  />
            <DefaultButton style = {{marginTop:'2rem',  borderRadius: 0.5}}text="Human walking a dog" onClick={_alertClicked}  />
        </Stack>

    );
};
export const DialogBasicExample: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const [question, setQuestion] = useState("Default prompt: Guess the house!");
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    alert(`Fetch question ${question}`)
}


  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
      dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [isDraggable, labelId, subTextId],
  );

  return (
    <>
      
      <DefaultButton secondaryText="Open sesame" onClick={toggleHideDialog} text="Answer" />
      <label id={labelId} className={screenReaderOnly}>
        My sample label
      </label>
      <label id={subTextId} className={screenReaderOnly}>
        My sample description
      </label>

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
        <ButtonDefaultExample/>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default DialogBasicExample;