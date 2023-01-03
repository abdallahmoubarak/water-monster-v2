import Image from "next/image";

export default function UploadImage({
  currentUser,
  image,
  setImage,
  setImg64,
}: uploadImgTypes) {
  return (
    <>
      <div className="white-profile-background relative w-40 h-40 bg-primary mx-auto rounded-full cursor-pointer overflow-hidden">
        <label
          htmlFor="upload-img-input"
          className="absolute opacity-0 z-10 cursor-pointer">
          <Image
            src={image || currentUser?.profile_url || ""}
            loader={() => image || currentUser?.profile_url || ""}
            alt=""
            width="160"
            height="160"
          />
        </label>
        <input
          className="absolute top-0 w-full h-full overflow-hidden z-[-1] "
          id="upload-img-input"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          // onChange={(e) => {
          //   var file = e.target.files[0];
          //   const reader = new FileReader();
          //   reader.onload = () => {
          //     reader.readyState === 2 && setImage(reader.result);
          //     reader.readyState === 2 &&
          //       setImg64(reader.result.split("base64,")[1]);
          //   };
          //   if (file) {
          //     reader.readAsDataURL(file);
          //   } else {
          //     setImage();
          //   }
          // }}
        />
      </div>
    </>
  );
}
type uploadImgTypes = {
  currentUser: any;
  image: string;
  setImage: Function;
  setImg64: Function;
};
