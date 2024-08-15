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
            alt={"photo optima"}
            width={50}
            height={50}
            className="object-cover ml-[-25px] w-[180px] h-[50px]"
        />
    )
}

export default Logo