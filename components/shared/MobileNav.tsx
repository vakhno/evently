import React from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import Image from 'next/image';
import Menu from '@/public/assets/icons/menu.svg';
import Logo from '@/public/assets/images/logo.svg';
import { Separator } from '../ui/separator';
import NavItems from './NavItems';
type Props = {};

const MobileNav = (props: Props) => {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger className="align-middle">
					<Image src={Menu} width={24} height={24} className="cursor-pointer" alt="menu" />
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-6 bg-white md:hidden">
					<Image src={Logo} alt="logo" width={128} height={38} />
					<Separator className="border border-gray-50" />
					<NavItems />
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default MobileNav;
