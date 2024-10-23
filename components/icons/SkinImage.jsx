import Image from "next/image";

const SkinImage = ({ skinID, width = 100, height = 100 }) => {
  const containerStyle = {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${width}px`,
    height: `${height}px`,
    position: "relative",
  };

  const imageStyle = {
    position: "absolute",
    top: "70%",
    left: "10%",
    width: "auto",
    height: "150%",
    transform: "scale(2)",
  };

  return (
    <div style={containerStyle}>
      <Image
        src={`https://assets.open.mp/assets/images/skins/${skinID}.png`}
        alt={`Skin ${skinID}`}
        style={imageStyle}
        width={width * 2}
        height={height * 2}
      />
    </div>
  );
};

export default SkinImage;
