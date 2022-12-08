# Events

## What is an event?

An event is an action or occurrence recognized by a software. To make an event more clear let's use the daily activities we do when we use a computer such as clicking on a button, hover on an image, pressing a keyboard, scrolling the mouse wheel and etc. The react documentation has already a detail note about [events](https://reactjs.org/docs/events.html).

Handling events in React is very similar to handling elements on DOM elements using pure JavaScript. Some of the syntax difference between handling event in React and pure JavaScript:

-   React events are named using camelCase, rather than lowercase.
-   With JSX you pass a function as the event handler, rather than a string.

Lets check an example first:

!!! example

    ```js
    function App() {
        const greetPeople = (event) => {
            alert('Welcome')
        }
        return <button onClick={greetPeople}>Welcome</button>
    }
    ```

However, in React it could be as follows:

<iframe src="https://codesandbox.io/embed/divine-fast-6egdo2?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="divine-fast-6egdo2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Overview

| Event Type/Category: | Events:                                                                                                                                                                                                                                                                                 | Event Specific Properties:                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clipboard            | onCopy, onCut, onPaste                                                                                                                                                                                                                                                                  | DOMDataTransfer, clipboardData                                                                                                                             |
| Composition          | onCompositionEnd, onCompositionStart, onCompositionUpdate                                                                                                                                                                                                                               | data                                                                                                                                                       |
| Keyboard             | onKeyDown, onKeyPress, onKeyUp                                                                                                                                                                                                                                                          | altKey, charCode, ctrlKey, getModifierState(key), key, keyCode, locale, location, metaKey, repeat, shiftKey, which                                         |
| Focus                | onChange, onInput, onSubmit                                                                                                                                                                                                                                                             | DOMEventTarget, relatedTarget                                                                                                                              |
| Form                 | onFocus, onBlur                                                                                                                                                                                                                                                                         |                                                                                                                                                            |
| Mouse                | onClick, onContextMenu, onDoubleClick, onDrag, onDragEnd, onDragEnter, onDragExit, onDragLeave, onDragOver, onDragStart, onDrop, onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseOut, onMouseOver, onMouseUp                                                               | altKey, button, buttons, clientX, clientY, ctrlKey, getModifierState(key), metaKey, pageX, pageY, DOMEventTarget relatedTarget, screenX, screenY, shiftKey |
| Selection            | onSelect                                                                                                                                                                                                                                                                                |                                                                                                                                                            |
| Touch                | onTouchCancel, onTouchEnd, onTouchMove, onTouchStart                                                                                                                                                                                                                                    | altKey DOMTouchList changedTouches, ctrlKey, getModifierState(key), metaKey, shiftKey, DOMTouchList targetTouches, DOMTouchList touches                    |
| UI                   | onScroll                                                                                                                                                                                                                                                                                | detail, DOMAbstractView view                                                                                                                               |
| Wheel                | onWheel                                                                                                                                                                                                                                                                                 | deltaMode, deltaX, deltaY, deltaZ                                                                                                                          |
| Media                | onAbort, onCanPlay, onCanPlayThrough, onDurationChange, onEmptied, onEncrypted, onEnded, onError, onLoadedData, onLoadedMetadata, onLoadStart, onPause, onPlay, onPlaying, onProgress, onRateChange, onSeeked, onSeeking, onStalled, onSuspend, onTimeUpdate, onVolumeChange, onWaiting |                                                                                                                                                            |
| Image                | onLoad, onError                                                                                                                                                                                                                                                                         |                                                                                                                                                            |
| Animation            | onAnimationStart, onAnimationEnd, onAnimationIteration                                                                                                                                                                                                                                  | animationName, pseudoElement, elapsedTime                                                                                                                  |
| Transition           | onTransitionEnd                                                                                                                                                                                                                                                                         | propertyName, pseudoElement, elapsedTime                                                                                                                   |
