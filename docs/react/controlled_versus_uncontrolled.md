# Controlled vs. Uncontrolled

If a React component has an element which changes by itself, it's called uncontrolled.
If you handle the rendering with React it's called controlled.

## Examples

### Controlled

You influence controlled inputs by using state and props.

<iframe src="https://codesandbox.io/embed/weathered-grass-e34n56?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="weathered-grass-e34n56"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Uncontrolled

<iframe src="https://codesandbox.io/embed/happy-tree-sdyikv?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"
     title="happy-tree-sdyikv"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

You can influence uncontrolled inputs by using ref and manipulating the DOM element directly.

## Pitfalls

It often happens, when you define a state with an empty default value and use this state as value for your input field.
Then you set this state via the `onChange` method of the input field.
What happens then is that a value is being set from `undefined -> string`.
If a prop is `undefined` it's not defined and there it won't be considered in the DOM element.
If you then set the prop the element changes from an uncontrolled to a controlled element.
React warns you about this problem.
Enter text in the following textfield and check the console.

<iframe src="https://codesandbox.io/embed/funny-blackburn-i97hg5?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="funny-blackburn-i97hg5"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
