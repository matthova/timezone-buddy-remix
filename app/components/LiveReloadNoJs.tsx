export function LiveReloadNoJs() {
  console.log("node env", process.env.NODE_ENV);
  if (process.env.NODE_ENV !== "testing") return null;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
                    let ws = new WebSocket("ws://localhost:3001/socket");
                    ws.onmessage = message => {
                      let event = JSON.parse(message.data);
                      if (event.type === "LOG") {
                        console.log(event.message);
                      }
                      if (event.type === "RELOAD") {
                        console.log("💿 Reloading window ...");
                        window.location.reload();
                      }
                    };
                    ws.onerror = error => {
                      console.log("Remix dev asset server web socket error:");
                      console.error(error);
                    };
        `,
      }}
    />
  );
}
