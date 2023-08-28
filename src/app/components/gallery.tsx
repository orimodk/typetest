import Image from 'next/image'

type ImageProps = {
    src: string;
    alt: string;
};

type GalleryProps = {
    images: ImageProps[];
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    const getFilenameWithoutExtension = (path: string): string => {
        const filename = path.split('/').pop() || ''; // Extract filename from path
        return filename.split('.').slice(0, -1).join('.'); // Remove the extension
    };
    return (
        <div className="container mx-auto px-y justify-between flex flex-wrap">
            {images.map((image, index) => {
                const altText = image.alt || getFilenameWithoutExtension(image.src);
                return (
                    <Image className='' width='300' height='200' key={index} src={image.src} alt={altText} />
                );
            })}
        </div>
    );
};

export default Gallery;