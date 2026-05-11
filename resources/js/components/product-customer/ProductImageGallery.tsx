import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState } from 'react';

interface ProductImageGalleryProps {
    images: string[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-amber-50">
                <ImageWithFallback
                    src={images[selectedImage]}
                    alt="Product image"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Thumbnail Gallery */}
            {/* <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                            selectedImage === index
                                ? 'border-green-600 ring-2 ring-green-300'
                                : 'border-gray-200 hover:border-green-400'
                        }`}
                    >
                        <ImageWithFallback
                            src={image}
                            alt={`Product view ${index + 1}`}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}
            </div> */}
        </div>
    );
}
