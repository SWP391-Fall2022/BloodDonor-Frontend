import { Button } from "antd";

export default function Test() {
    const removeImage = async () => {
        const string = "http://res.cloudinary.com/tmquan/image/upload/v1666446022/ylpdmizkdmvvxcbonwez.png".split("/")
        const newString = string[7].split(".")
        console.log(newString);
    };
    return (
        <Button onClick={removeImage}>Test</Button>
    )
}