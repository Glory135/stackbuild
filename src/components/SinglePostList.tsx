import { Post } from '@/utils/interfaces';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';



export default function SinglePostList({ data }: { data: Post }) {
    return (
        <Card className='singlePostList'>
            <Link href={`/${data.id}`} className='Link '>
                <Image
                    className='post-media'
                    alt='post'
                    unoptimized
                    src={data.image || '/img-placeholder.png'}
                    width={100}
                    height={'200'}
                />
                <CardContent className='card-context'>
                    <Avatar src={data.owner.picture || '/dp-placeholder'} alt='user' />
                    <div className="post-details">
                        <div className="post-text">
                            {data.text}
                        </div>
                        <div className="post-tags">
                            {data.tags.map((tag, index) => {
                                return (
                                    <span key={index} className="tag">{tag}{' '}</span>
                                )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    )
}
