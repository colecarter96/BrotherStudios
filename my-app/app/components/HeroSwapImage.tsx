'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type HeroSwapImageProps = {
	className?: string;
	width?: number;
	height?: number;
	alt?: string;
	intervalMs?: number;
};

export default function HeroSwapImage({
	className,
	width = 1400,
	height = 800,
	alt = 'Two Brothers Artwork',
	intervalMs = 2000,
}: HeroSwapImageProps) {
	const [showPaintVariant, setShowPaintVariant] = useState(false);

	useEffect(() => {
		const id = window.setInterval(() => {
			setShowPaintVariant((prev) => !prev);
		}, intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);

	const src = showPaintVariant ? '/paintTwo.svg' : '/regularTwo.svg';

	return (
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			className={className}
			priority
		/>
	);
}


