import "@styles/global.css";

export const metadata = {
  title: "promptopia",
  description: " Discover 6 share AI Prompts",
};

const Rootlayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradiant" />
        </div>
        <main className="app">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Rootlayout;
