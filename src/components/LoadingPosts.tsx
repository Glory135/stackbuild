import Image from "next/image"
export default function LoadingPosts() {
    return (
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
            <Image
                key={idx}
                alt='loader'
                className='loader-img'
                src='/skeleton_effect.gif'
                width={0}
                height={0}
                sizes='100vw'
            />
        ))
    )
}
