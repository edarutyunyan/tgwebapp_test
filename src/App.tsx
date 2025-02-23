import {useEffect} from 'react';
import { useTelegram } from "./hooks";

function App() {
  const { app, user, toggleButton, sendData } = useTelegram();
  
  useEffect(() => {
    app.ready();
    toggleButton();
    app.MainButton.onClick(() => sendData({ message: 'Main button was clicked!' }));
  }, [app, toggleButton]);
  
  useEffect(() => {
    sendData('hello from app')
  }, []);
  return (
    <div className="App">
      <div>{`Hello ${[user?.first_name, user?.last_name].join(' ')  || 'stranger'}!`}</div>

      <div>uns start:{Telegram.WebApp.initDataUnsafe?.start_param}</div>
      
      <div className={'content'}>
        {['reebok', 'nike', 'adidas', 'puma']
          .map((brand) => Array(10).fill(brand).map((b, i) => b + (i + 1)))
          .flat()
          .map((brand, idx) => {
            return (
              <div key={idx} className={'product-card'}>
                <div>photo here</div>
                <div>{brand}</div>
              </div>
            )
          })}
      </div>
      
      <div>
        <button onClick={toggleButton}>Toggle button</button>
        <button onClick={() => app.sendData(JSON.stringify({ dataFromWebApp: app.initData }))}>Send data</button>
      </div>
    </div>
  );
}

export default App;
