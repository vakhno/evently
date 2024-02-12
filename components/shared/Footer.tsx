import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/public/assets/images/logo.svg';

type Props = {};

const Footer = (props: Props) => {
	return (
		<footer className="border-t">
			<div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
				<Link href="/">
					<Image src={Logo} alt="logo" width={128} height={38} />
				</Link>
				<p>2024 Evently. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
