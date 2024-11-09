import { useEffect } from 'react';
import { useTelegram } from "./hooks";

const BOT_SERVER_IP_ADDRESS = 'http://217.18.62.216:4000/';

function App() {
  const { app, user, toggleButton, sendData } = useTelegram();
  
  useEffect(() => {
    app.ready();
    toggleButton();
    app.MainButton.onClick(() => sendData({ message: 'Main button was clicked!' }));
  }, [app, toggleButton]);
  
  useEffect(() => {
    fetch(BOT_SERVER_IP_ADDRESS, {method: 'GET'}).then(res => console.log(res));
  }, []);
  return (
    <div className="App">
      <div>{`Hello ${user?.last_name ?? 'stranger'}!`}</div>
      {JSON.stringify(user)}
      
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
