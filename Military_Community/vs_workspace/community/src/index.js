import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals(); // React 18에서의 작성법(아래와 같은 의미)

// ReactDOM.render(
//   <App /> ,
//   document.getElementById('root')
// );
//ReactDOM.render(elementToRender, containerElement)는 elementToRender를 
//containerElement 내부에 렌더링하여 elementToRender의 내용을 실제 화면에 표시하게 됩니다.
//위에서 root는 index.html에 존재하는 id='root'인 태그 내부를 의미한다.


