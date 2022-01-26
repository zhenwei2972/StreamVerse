import * as React from 'react';
import { useState } from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { Stack, IStackTokens } from '@fluentui/react';
import axios from 'axios';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
const img = require("../../img.png");

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
  title: 'Pick the right image! Speak only chinese',
  closeButtonAriaLabel: 'Close',
  //subText: 'Do you want to send this message without a subject?',
};

const stackTokens: IStackTokens = { childrenGap: 40 };


export interface GameState {
  // These are set based on the toggles shown above the examples (not needed in real code)
  currentPlayer?: string;
  thisCanBeAnImageId?: number;
  // checked?: boolean;
  // websocket?: WebSocket;
}



export const ButtonDefaultExample: React.FunctionComponent<GameState> = props => {
  const { currentPlayer, thisCanBeAnImageId } = props;
  function _alertClicked(ImageID:number): void {
    //send the image prop over 
    alert('Clicked on' + ImageID);
    if(ImageID===thisCanBeAnImageId)
    {
      console.log("You are right!")
    }
    else{
      console.log("You are wrong!")
    }
  }
  const allImages = [
    {
      number: 1,
      image: "img"
    },
    {
      number: 2,
      image: "img"
    },
    {
      number: 3,
      image: "img"
    },
    {
      number: 4,
      image: "img"
    },
    {
      number: 5,
      image: "img"
    },
    {
      number: 6,
      image: "img"
    },
  ]
  const [startIndex, setStart ] = useState();
  let subset = allImages.slice(0, 4)
  
  return (
    <>
      {subset.map((item, index) => (
        <button key={index} >
          <img
            src={require('../../' +
              item.image +
              '.png')}
            className="img-fluid"
            onClick={()=>_alertClicked(item.number)}
          />

        </button>
      ))}
    </>

  );
};
export const DialogBasicExample: React.FunctionComponent<GameState> = props => {
  const { currentPlayer, thisCanBeAnImageId } = props;
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(true);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');
  const [question, setQuestion] = useState("Default prompt: Guess the house!");
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    alert(`Fetch question ${question}`)
  }
  { console.log(thisCanBeAnImageId) }

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
      <p>{currentPlayer}</p>
      <DefaultButton secondaryText="Open sesame" onClick={toggleHideDialog} text="start game" />
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
          <ButtonDefaultExample {...props} />
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default DialogBasicExample;