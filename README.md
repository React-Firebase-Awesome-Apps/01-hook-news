Udemy Course: 
### [Awesome Apps with React Hooks and Firebase](https://www.udemy.com/course/awesome-apps-with-react-hooks-and-firebase/)


- customHooks (session 3)
- add firebase to your web app (session 4, 10)

[Synthetic Events in React](https://medium.com/@mrewusi/synthetic-events-in-react-4f3de0c827f#:~:text=Synthetic%20Events%20are%20pooled,event%20handler%20has%20been%20called.)

```This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property <property> on a released/nullified synthetic event. This is set to null. If you must keep the original synthetic event around, use **event.persist()...**```
If you’ve ever seen the error above and wondered… wait, what? then it is my hope that this article shines some light on what’s really happening and why event.persist() is necessary at all.