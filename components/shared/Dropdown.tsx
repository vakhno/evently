import React, { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '../ui/input';

type dropdownOptionType = {
	_id: string;
	name: string;
};

type Props = {
	value: string;
	placeholder: string;
	options: dropdownOptionType[] | [];
	onChangeHandler: () => void;
	isAlertDialogAccessible?: boolean;
	alertDialogTitle?: string;
	alertDialogDescription?: string;
	isAlertDialogInput?: boolean;
	alertDialogInputPlaceholder?: string;
	alertDialogChangeHandler?: (value: string) => void;
	alertDialogApplyHandler?: () => void;
	alertDialogCancelHandler?: () => void;
};

const Dropdown = ({
	value,
	onChangeHandler,
	placeholder,
	options,
	isAlertDialogAccessible,
	alertDialogTitle,
	alertDialogDescription,
	isAlertDialogInput,
	alertDialogInputPlaceholder,
	alertDialogChangeHandler,
	alertDialogApplyHandler,
	alertDialogCancelHandler,
}: Props) => {
	return (
		<Select onValueChange={onChangeHandler} defaultValue={value}>
			<SelectTrigger className="select-field">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.length
					? options.map((option) => (
							<SelectItem key={option._id} value={option._id}>
								{option.name}
							</SelectItem>
					  ))
					: null}
				{isAlertDialogAccessible ? (
					<AlertDialog>
						<AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
							Create
						</AlertDialogTrigger>
						<AlertDialogContent className="bg-white">
							<AlertDialogHeader>
								<AlertDialogTitle>{alertDialogTitle}</AlertDialogTitle>
								<AlertDialogDescription>
									{isAlertDialogInput ? (
										<Input
											type="text"
											placeholder={alertDialogInputPlaceholder}
											className="input-field mt-3"
											onChange={(e) =>
												alertDialogChangeHandler && alertDialogChangeHandler(e.target.value)
											}
										/>
									) : (
										alertDialogDescription
									)}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel onClick={alertDialogCancelHandler}>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={alertDialogApplyHandler}>Apply</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				) : null}
			</SelectContent>
		</Select>
	);
};

export default Dropdown;
