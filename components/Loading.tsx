import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <>
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png'
            alt=''
            style={{ marginBottom: 30 }}
            height={200}
          />
          <CircularProgress size={60} style={{ color: "gray" }} />
        </div>
      </div>
    </>
  );
};

export default Loading;
