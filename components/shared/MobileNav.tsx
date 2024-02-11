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

type Props = {};

const MobileNav = (props: Props) => {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger className="align-middle">
					<Image src="" width={24} height={24} className="cursor-pointer" alt="menu" />
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Are you absolutely sure?</SheetTitle>
						<SheetDescription>
							This action cannot be undone. This will permanently delete your account and remove
							your data from our servers.
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default MobileNav;
