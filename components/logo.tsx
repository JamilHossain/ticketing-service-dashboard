import Image from "next/image"

interface LogoProps {
    src:string;
}

const Logo:React.FC<LogoProps> = ({
    src
}) => {
    return (
        <Image
            src={src}
            alt={"ASD"}
            width={50}
            height={50}
            className="object-fill ml-[-25px] w-[180px] h-[50px]"
        />
    )
}

export default Logo