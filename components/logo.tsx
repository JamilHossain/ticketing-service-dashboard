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
            className="ml-[-25px] w-[180px] h-[50px]"
        />
    )
}

export default Logo