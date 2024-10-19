const SkinImage = ({ skinID, width = 100, height = 100 }) => {
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "auto",
    height: "150%",
    transform: "translate(5%, 65%) scale(2)",
  };
  return (
    <div style={containerStyle}>
      <img src={`https://assets.open.mp/assets/images/skins/${skinID}.png`} style={imageStyle} />
    </div>
  );
};

export default SkinImage;
